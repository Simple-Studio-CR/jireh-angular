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
export class LamparasCapturasMesService {
  constructor(
    private http: HttpClient, private authService: AuthHTTPService, private router: Router,
    private variables: GlobalVariablesService
  ) {
  }

  findByDateRange(id: number, date: string, date2: string): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/get-by-date-range' + '/' + id + '/' + date + '/' + date2, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findByDate(id: number, date: number): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/get-by-date/' + id + '/' + date + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findByYear(id: number, year: number): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/get-by-year/' + id + '/' + year + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          })
      );
  }

  findAll(): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/get-all', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(lamparasCapturasMes: any): Observable<any> {
    return this.http.post<any>(this.variables.getServicingEndpoint() + '/lamparas-capturas-x-mes/save', lamparasCapturasMes, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findReporteAnual(year: any, branchId: any): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() +
      '/lamparas-capturas-x-mes/get-reporte-por-mes/'
      + year + '/' + branchId + '/',
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findVerificandoExistencia(createAt1: number, createAt2: number, clientId: number, trap: number): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() +
      '/lamparas-capturas-x-mes/get-reporte-verificando-existencia/' +
      createAt1 + '/' + createAt2 + '/' + clientId + '/' + trap + '/',
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findReporteAnualPorNumeroTrampa(branchId: any, trampa: any): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() +
      '/lamparas-capturas-x-mes/get-reporte-verificando-existencia/' +
      branchId + '/' + trampa + '/',
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

}
