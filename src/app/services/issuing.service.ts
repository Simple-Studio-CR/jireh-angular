import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {allowedService} from "./auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {IssuingsAccessUsersService} from "./issuings-access-users.service";
import {GlobalVariablesService} from "./globalVariables.service";
import {Issuing} from "../models/issuing";
import {AuthService} from "../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class IssuingService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  public listAll(page: number, size: number): Observable<any> {
    let username = sessionStorage.getItem('userName');
    return this.http.get<IssuingsAccessUsersService[]>(this.variables.getServicingEndpoint() + '/emisor/' + username + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
          allowedService.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findRoles(issuingId: number): Observable<any> {
    let username = sessionStorage.getItem('userName');
    return this.http.get<String[]>(this.variables.getServicingEndpoint() + '/emisor/auth/' + username + '/' + issuingId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
          allowedService.notAllowed(err);
            return throwError(err);
          }
        )
      );

  }

  public save(issuing: FormData): Observable<any> {
    return this.http.post<FormData>(this.variables.getServicingEndpoint() + '/emisor/save/v2', issuing, {headers: this.variables.getAuthHeaderMultiPart()})
      .pipe(catchError(err => {
          allowedService.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findById(id: number): Observable<any> {
    return this.http.get<Issuing[]>(this.variables.getServicingEndpoint() + '/emisor/get-for-/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
          allowedService.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
