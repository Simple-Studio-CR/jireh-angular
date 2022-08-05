import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {InvoiceDocumentTypeExoneration} from "../models/invoice-document-type-exoneration";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {IssuingEconomyActivities} from "../models/issuing-economy-activities";
import {AuthService} from "../modules/auth";
import {Currency} from "../models/currency";
import {PestType} from "../models/pest-type";
import {Recommendations} from "../models/recommendations";

@Injectable({
  providedIn: 'root'
})

export class ExtrasService {

  documentExonerationType: InvoiceDocumentTypeExoneration

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public findExonerationTypeAll(): Observable<any> {
    return this.http.get<(InvoiceDocumentTypeExoneration[])>(this.variables.getServicingEndpoint() + '/extras/documentType/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findExonerationById(id: number): Observable<any> {
    return this.http.get<(InvoiceDocumentTypeExoneration[])>(this.variables.getServicingEndpoint() + '/extras/documentType/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findEconomyActivitiesAll(): Observable<any> {
    return this.http.get<IssuingEconomyActivities>(this.variables.getServicingEndpoint() + '/extras/activity', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public currenciesFindAll(): Observable<any> {
    return this.http.get<Currency>(this.variables.getServicingEndpoint() + '/extras/currencies', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public searchIdentification(identification: string): Observable<any> {
    return this.http.get('https://api.hacienda.go.cr/fe/ae?identificacion=' + identification)
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public searchExoneration(documentNumber: string): Observable<any> {
    return this.http.get('https://api.hacienda.go.cr/fe/ex?autorizacion=' + documentNumber)
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
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
