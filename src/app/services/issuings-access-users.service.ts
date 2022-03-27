import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {allowedService} from "./auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {IssuingAccessUsers} from "../models/issuing-access-users";
import {AuthService} from "../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class IssuingsAccessUsersService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  public listAll(): Observable<any> {
    return this.http.get<IssuingsAccessUsersService[]>(this.variables.getServicingEndpoint() + '/issuings/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
          allowedService.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveAuthority(userAccess: any): Observable<any> {
    return this.http.post<IssuingAccessUsers[]>(this.variables.getServicingEndpoint() + '/emisor/saveAuth' , userAccess, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
          allowedService.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public getAuth(userId: String, issuingId: Number): Observable<any> {
    return this.http.get<IssuingAccessUsers[]>(this.variables.getServicingEndpoint() + '/emisor/auth/' + userId + '/' + issuingId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
          allowedService.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }


}
