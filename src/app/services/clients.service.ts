import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {GlobalVariablesService} from "./globalVariables.service";
import {ClientsCreditType} from "../models/clients-credit-type";
import {Clients} from "../models/clients";
import {ClientsType} from "../models/clients-type";
import {AuthHTTPService} from "../modules/auth/services/auth-http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public listAll(page:number, size:number ): Observable<any> {
    let branchId = sessionStorage.getItem('branchId');
    console.log('se envia username al endpoint', branchId);
    return this.http.get<Clients[]>(this.variables.getServicingEndpoint() + '/clients/branch/' + branchId + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findById(): Observable<any>{
    let clientId = sessionStorage.getItem('clientId');
    console.log('se filtra el cliente por id = ', clientId);
    return this.http.get<(Clients[])>(this.variables.getServicingEndpoint() + '/clients/' + clientId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public save(client:Clients): Observable<any>{
    return this.http.post<Clients>(this.variables.getServicingEndpoint()+'/clients/save/',client,{headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findCreditTypeAll(): Observable<any>{
    return this.http.get<(ClientsCreditType[])>(this.variables.getServicingEndpoint() + '/clients/creditTypeAll/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public findTypeAll(): Observable<any>{
    return this.http.get<(ClientsType[])>(this.variables.getServicingEndpoint() + '/clients/typeAll/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public updateClient(client: Clients): Observable<any> {
    return this.http.put(this.variables.getServicingEndpoint() + '/clients/' + client.id, client , {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

}
