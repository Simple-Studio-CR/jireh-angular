/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CebaderosReport} from "../models/cebadero-report";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";

@Injectable({
  providedIn: 'root'
})
export class CebaderosService {

  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  getDetailedReport(branchOfficeId: number, year: number): Observable<any> {
    const url = `/cebaderos/detailedReport/branch/${branchOfficeId}/year/${year}`;
    return this.http.get<CebaderosReport>(this.variables.getServicingEndpoint() + url,
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  saveCebadero(cebadero: any): Observable<any> {
    const url = `/cebaderos/`;
    return this.http.post<any>(this.variables.getServicingEndpoint() + url, cebadero,
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  updateCebadero(cebadero: any): Observable<any> {
    const url = `/cebaderos/`;
    return this.http.put<any>(this.variables.getServicingEndpoint() + url + cebadero.id, cebadero,
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findByBranchYearMonthDayCebadero(branchId: number, year: number, month: number, day: number, cebadero: number): Observable<any> {
    const url = `/cebaderos/detailedReport/branch/${branchId}/year/${year}/month/${month}/day/${day}/cebadero/${cebadero}`;
    return this.http.get<any>(this.variables.getServicingEndpoint() + url,
      {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
