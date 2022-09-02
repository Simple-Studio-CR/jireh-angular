import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../modules/auth";
import {PestType} from "../models/pest-type";
import {Recommendations} from "../models/recommendations";

@Injectable({
  providedIn: 'root'
})

export class ExtrasService {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public getPestType(): Observable<any> {
    return this.http.get<PestType>(this.variables.getServiceEndpoint() + '/extras/get-pest', {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public getRecommendations(): Observable<any> {
    return this.http.get<Recommendations>(this.variables.getServiceEndpoint() + '/extras/get-recommendation', {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findRecommendationsByType(type: string): Observable<any> {
    return this.http.get<Recommendations>(this.variables.getServiceEndpoint() + '/extras/get-recommendation-type/' + type, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public findRecommendationsById(id: string): Observable<any> {
    return this.http.get<Recommendations>(this.variables.getServiceEndpoint() + '/extras/get-recommendation/' + id, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public saveRecommendations(recommendations: Recommendations):Observable<any>{
    return this.http.post<Recommendations>(this.variables.getServiceEndpoint() + '/extras/save-recommendations', recommendations, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public savePestType(pestTypeMono: PestType):Observable<any>{
    return this.http.post<PestType>(this.variables.getServiceEndpoint() + '/extras/save-pest', pestTypeMono, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
