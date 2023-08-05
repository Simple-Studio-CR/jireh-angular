import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Users} from "../models/users";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../modules/auth";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  public save(user: Users): Observable<any> {
    return this.http.post<Users>(this.variables.getServicingEndpoint() + '/user/save', user,
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            console.log('el error status es : ', err.status)
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public findUserByUserName(userName: String): Observable<any>{
    return this.http.get<Users>(this.variables.getBaseEndpoint()+'/api/servicing/v1/search/findUserName?username='+userName, {headers:this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            console.log('el error status es : ', err.status)
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }


}
