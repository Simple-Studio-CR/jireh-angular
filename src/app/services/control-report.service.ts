import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {ControlReport} from "../models/control-report";
import {catchError} from "rxjs/operators";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/utils";

@Injectable({
  providedIn: 'root'
})
export class ControlReportService {
  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public findControlByWarehouse(warehouse: string, enabled: boolean, pageNo: number, pageSize: number): Observable<any> {
    return this.http.get<ControlReport>(this.variables.getServicingEndpoint() + '/controlReport/get/' + warehouse + '/' + enabled + '/' + pageNo + '/' + pageSize, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findControlByClient(clientId: string | null, enabled: boolean, pageNo: number, pageSize: number): Observable<any> {
    return this.http.get<ControlReport>(this.variables.getServicingEndpoint() + '/controlReport/get-client/' + clientId + '/' + enabled + '/' + pageNo + '/' + pageSize, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveControlReport(control: ControlReport): Observable<any> {
    return this.http.post<ControlReport>(this.variables.getServicingEndpoint() + '/controlReport/save', control, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public editControlReport(control: ControlReport | JsonObject): Observable<any> {
    console.log(control.id, ' este es el service que imprime el id')
    return this.http.put<ControlReport>(this.variables.getServicingEndpoint() + '/controlReport/' + control.id, control, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

}
