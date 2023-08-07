/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TrampasGomosasService {
  constructor(
    private http: HttpClient,
    private authService: AuthHTTPService,
    private router: Router,
    private variables: GlobalVariablesService
  ) {
  }

  // Obtener Trampas Gomosas en un rango de fechas
  findByDateRange(id: number, date: string, date2: string): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/trampas-gomosas/get-by-date-range' + '/' + id + '/' + date + '/' + date2, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  // Obtener Trampas Gomosas para una fecha específica
  findByDate(id: number, date: number): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/trampas-gomosas/get-by-date/' + id + '/' + date + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  // Obtener todas las Trampas Gomosas
  findAll(): Observable<any> {
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/trampas-gomosas/get-all', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  // Guardar una nueva Trampa Gomosa
  save(trampasGomosas: any): Observable<any> {
    return this.http.post<any>(this.variables.getServicingEndpoint() + '/trampas-gomosas/save', trampasGomosas, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  // Actualizar una Trampa Gomosa existente
  update(trampasGomosas: any): Observable<any> {
    return this.http.post<any>(this.variables.getServicingEndpoint() + '/trampas-gomosas/update', trampasGomosas, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  // Obtener un informe anual de Trampas Gomosas
  findReporteAnual(year: any): Observable<any>{
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/trampas-gomosas/get-reporte-por-mes/' + year, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  // Verificar la existencia de Trampas Gomosas
  findVerificandoExistencia(createAt1: number, createAt2: number, clientId: number, trap:number): Observable<any>{
    return this.http.get<any>(this.variables.getServicingEndpoint() +
      '/trampas-gomosas/get-reporte-verificando-existencia/' +
      createAt1 + '/' + createAt2 + '/' + clientId + '/' + trap + '/',
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
