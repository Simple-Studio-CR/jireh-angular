/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthHTTPService} from "../modules/auth/services/auth-http";

@Injectable({
  providedIn: 'root'
})
export class LamparasCapturasMesService{
  constructor(
    private http: HttpClient, private authService: AuthHTTPService, private router: Router,
    private variables: GlobalVariablesService
  ) {
  }
  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }
  findByDateRange(id:number, date: string, date2: string): Observable<any>{
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/get-by-date-range' + '/' + id + '/' + date + '/' + date2, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  findByDate(id:number, date: string): Observable<any>{
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/get-by-date/'  + id + '/' + date + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findAll(): Observable<any>{
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/get-all', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(lamparasCapturasMes: any): Observable<any>{
    return this.http.post<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/save', lamparasCapturasMes, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
