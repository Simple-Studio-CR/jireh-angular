import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {Feedlots} from "../models/feedlots";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FeedlotService {
  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  public findByControlReport(controlReport: number): Observable<any> {
    return this.http.get<Feedlots>(this.variables.getServicingEndpoint() + '/feedlots/get-cr/' + controlReport, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveFeedlot(feedlot: Feedlots): Observable<any> {
    return this.http.post<Feedlots>(this.variables.getServicingEndpoint() + '/feedlots/save', feedlot, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public editFeedlot(feedlot: Feedlots): Observable<any> {
    return this.http.put<Feedlots>(this.variables.getServicingEndpoint() + '/feedlots/edit/' + feedlot.id, feedlot, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public genereatePDF(id: any): Observable<any>{
    return this.http.get<any>(this.variables.getServicingEndpoint() + '/print/feedlots/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
