import {Injectable} from '@angular/core';
import {Provider} from "../models/provider";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {GlobalVariablesService} from "./globalVariables.service";
import {AuthService} from "../modules/auth";
import {IssuingBranch} from "../models/issuing-branch";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public listAll(page: number, size: number): Observable<any> {
    let branchId = sessionStorage.getItem('branchId');
    return this.http.get<Provider[]>(this.variables.getServicingEndpoint() + '/providers/findByBranch/' + branchId + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public save(provider: Provider): Observable<any> {
    return this.http.post<Provider>(this.variables.getServicingEndpoint() + '/providers/', provider, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public listAllByBranch(branch: IssuingBranch): Observable<any> {
    return this.http.post<Provider[]>(this.variables.getServicingEndpoint() + '/providers/findByBranch/', branch, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findById(id: number): Observable<any> {
    return this.http.get<Provider>(this.variables.getServicingEndpoint() + '/providers/findById/' + id + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findProviderCode(id: number, branch: IssuingBranch): Observable<any> {
    return this.http.post<Provider>(this.variables.getServicingEndpoint() + '/providers/find-provider-code/'+ id, branch, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
