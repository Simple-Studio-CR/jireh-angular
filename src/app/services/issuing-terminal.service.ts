import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {IssuingsAccessUsersService} from "./issuings-access-users.service";
import {catchError} from "rxjs/operators";
import {IssuingTerminal} from "../models/issuing-terminal";

@Injectable({
  providedIn: 'root'
})
export class IssuingTerminalService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err): boolean {
    if (err.status == 401 || err.status == 403) {
      this.router.navigate['/login'];
      return true;
    }
    return false;
  }

  public listAll(id: number, page: number, size: number): Observable<any> {
    return this.http.get<IssuingTerminal[]>(this.variables.getServicingEndpoint() + '/terminals/find/' + id + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public save(terminal: IssuingTerminal): Observable<any> {
    return this.http.post<IssuingTerminal[]>(this.variables.getServicingEndpoint() + '/terminals/' ,terminal,{headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
