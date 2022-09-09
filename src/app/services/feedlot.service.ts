import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {Feedlots} from "../models/feedlots";
import {catchError} from "rxjs/operators";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/utils";
import {ControlReport} from "../models/control-report";

@Injectable({
  providedIn: 'root'
})
export class FeedlotService {
  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public findByControlReport(controlReport: number): Observable<any> {
    return this.http.get<Feedlots>(this.variables.getServicingEndpoint() + '/feedlots/get-cr/' + controlReport, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveFeedlot(feedlot: Feedlots | JsonObject): Observable<any> {
    return this.http.post<Feedlots>(this.variables.getServicingEndpoint() + '/feedlots/save', feedlot, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public editFeedlot(feedlot: Feedlots | JsonObject): Observable<any> {
    return this.http.put<Feedlots>(this.variables.getServicingEndpoint() + '/feedlots/edit/' + feedlot.id, feedlot, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public genereatePDF(id: any): Observable<any>{
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/print/feedlots/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
