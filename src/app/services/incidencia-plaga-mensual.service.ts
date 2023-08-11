import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../modules/auth";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {IncidenciasPlagasMensual} from "../models/incidencias-plagas-mensual";

@Injectable({
  providedIn: 'root'
})
export class IncidenciaPlagaMensualService {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  save(incidenciasPlagasMensual: IncidenciasPlagasMensual): Observable<any> {
    return this.http.post<IncidenciasPlagasMensual>(this.variables.getServicingEndpoint() + '/incidencia-mensual/save', incidenciasPlagasMensual, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  update(incidenciasPlagasMensual: IncidenciasPlagasMensual): Observable<any> {
    return this.http.put<IncidenciasPlagasMensual>(this.variables.getServicingEndpoint() + '/incidencia-mensual/edit/' , incidenciasPlagasMensual, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findByDateRange(id:number, date: string, date2: string): Observable<any>{
    return this.http.get<IncidenciasPlagasMensual>(this.variables.getServicingEndpoint() + '/incidencia-mensual/get-by-date-range' + '/' + id + '/' + date + '/' + date2, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findByDate(id:number, date: number): Observable<any>{
    return this.http.get<IncidenciasPlagasMensual>(this.variables.getServicingEndpoint() + '/incidencia-mensual/get-by-date' + '/' + id + '/' + date + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findByYear(id:number, year: number): Observable<any>{
    return this.http.get<IncidenciasPlagasMensual>(this.variables.getServicingEndpoint() + '/incidencia-mensual/get-by-year' + '/' + id + '/' + year + '/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
