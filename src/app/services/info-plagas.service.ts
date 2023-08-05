import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {InfoPlagas} from "../models/info-plagas";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthHTTPService} from "../modules/auth/services/auth-http";

@Injectable({
  providedIn: 'root'
})
export class InfoPlagasService{
  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }


  save(infoPlagas: InfoPlagas): Observable<any>{
    return this.http.post<InfoPlagas>(this.variables.getServicingEndpoint() + '/info-plagas/save', infoPlagas, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  findByDateRange(id:number, date: string, date2: string): Observable<any>{
    return this.http.get<InfoPlagas>(this.variables.getServicingEndpoint() + '/info-plagas/get-by-date-range' + '/' + id + '/' + date + '/' + date2, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findByDate(id:number, date: string): Observable<any>{
    return this.http.get<InfoPlagas>(this.variables.getServicingEndpoint() + '/info-plagas/get-by-date/'  + id + '/' + date + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  findAll(): Observable<any>{
    return this.http.get<InfoPlagas>(this.variables.getServicingEndpoint() + '/info-plagas/get-all', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
