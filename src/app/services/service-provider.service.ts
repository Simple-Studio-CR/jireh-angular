import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../modules/auth";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ServiceProvider} from "../models/service-provider";
import {ServiceProviderPestTypeDetail} from "../models/service-provider-pest-type-detail";
import {ServiceProviderRecommendations} from "../models/service-provider-recommendations";
import {ServiceProviderDetails} from "../models/service-provider-details";
import {ServiceProviderDetailsV1} from "../models/service-provider-details-v1";

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService{
  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public getServiceProvider(client: number | null, pageNo: number, pageSize: number): Observable<any> {
    return this.http.get<ServiceProvider[]>(this.variables.getServicingEndpoint() + '/service-provider/get-main-by-client/' + client + '/' + pageNo + '/' + pageSize , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public getServiceProviderPestTypeDetails(serviceProviderId: string | null): Observable<any> {
    return this.http.get<ServiceProviderPestTypeDetail[]>(this.variables.getServicingEndpoint() + '/service-provider/get-pest-type-by-service-provider/' + serviceProviderId , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public getServiceRecommendationsDetails(serviceProviderId: string | null): Observable<any> {
    return this.http.get<ServiceProviderRecommendations[]>(this.variables.getServicingEndpoint() + '/service-provider/get-recommendations-by-service-provider/' + serviceProviderId , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public getServiceDetails(serviceProviderId: string | null): Observable<any> {
    return this.http.get<ServiceProviderDetails[]>(this.variables.getServicingEndpoint() + '/service-provider/get-details-by-service-provider/' + serviceProviderId , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public getServiceDetailsV1(serviceProviderId: string | null): Observable<any> {
    return this.http.get<ServiceProviderDetailsV1[]>(this.variables.getServicingEndpoint() + '/service-provider/get-details-v1-by-service-provider/' + serviceProviderId , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveServiceProvider(monoServicesProvider: ServiceProvider): Observable<any> {
    return this.http.post<ServiceProvider[]>(this.variables.getServicingEndpoint() + '/service-provider/save-main/', monoServicesProvider , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveServiceProviderRecommendations(recommendationsMono: ServiceProviderRecommendations): Observable<any> {
    return this.http.post<ServiceProviderRecommendations[]>(this.variables.getServicingEndpoint() + '/service-provider/save-recommendations' + recommendationsMono , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveServiceProviderDetails(detailsMono: ServiceProviderDetails): Observable<any> {
    return this.http.post<ServiceProviderDetails[]>(this.variables.getServicingEndpoint() + '/service-provider/save-details' + detailsMono , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveServiceProviderPestTypeDetails(detailsMono: ServiceProviderPestTypeDetail): Observable<any> {
    return this.http.post<ServiceProviderPestTypeDetail[]>(this.variables.getServicingEndpoint() + '/service-provider/save-pest-type' + detailsMono , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public saveServiceProviderDetailsV1(detailsMono: ServiceProviderDetailsV1): Observable<any> {
    return this.http.post<ServiceProviderDetails[]>(this.variables.getServicingEndpoint() + '/service-provider/save-details-v1' , detailsMono , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
