import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {Feedlots} from "../models/feedlots";
import {catchError} from "rxjs/operators";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/utils";

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

  public findByControlReport(idControlReport: any): Observable<any> {
    return this.http.get<Feedlots>(this.variables.getServiceEndpoint() + '/feedlots/get-cr/' + idControlReport, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveFeedlot(feedlot: Feedlots | JsonObject): Observable<any> {
    return this.http.post<Feedlots>(this.variables.getServiceEndpoint() + '/feedlots/save', feedlot, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public editFeedlot(feedlot: Feedlots | JsonObject): Observable<any> {
    return this.http.put<Feedlots>(this.variables.getServiceEndpoint() + '/feedlots/' + feedlot.id, feedlot, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
