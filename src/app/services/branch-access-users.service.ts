import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {IssuingBranch} from "../models/issuing-branch";
import {AuthHTTPService} from "../modules/auth/services/auth-http";

@Injectable({
  providedIn: 'root'
})
export class BranchAccessUsersService {

  constructor(private http: HttpClient, private authHttpService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public listAll(page: number, size: number): Observable<any> {
    let userName = sessionStorage.getItem('userName');
    let issuingId = sessionStorage.getItem('emisorId');
    return this.http.get<BranchAccessUsersService[]>(this.variables.getServicingEndpoint() + '/branch/v1/' + userName + '/' + issuingId + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(branch: IssuingBranch): Observable<any> {
    return this.http.post<IssuingBranch>(this.variables.getServicingEndpoint() + '/branch/save', branch, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  findById(id: Number):Observable<any>{
    return this.http.get<IssuingBranch>(this.variables.getServicingEndpoint()+'/branch/'+ id, {headers:this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public addEconomyActivity(activity: IssuingBranch, id: number): Observable<any>{
    return this.http.put<IssuingBranch>(this.variables.getServicingEndpoint() + '/branch/update-activities/' + id, activity, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
