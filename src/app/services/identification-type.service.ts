import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {IdentificationType} from "../models/identification-type";
import {AuthService} from "../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) { }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public findIdType(id: number): Observable<any> {
    return this.http.get<IdentificationType[]>(this.variables.getServicingEndpoint() + '/extras/identificationType/'+ id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findAll(): Observable<any> {
    return this.http.get<IdentificationType[]>(this.variables.getServicingEndpoint() + '/extras/identificationType/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}

