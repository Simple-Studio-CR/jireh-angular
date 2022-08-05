import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {GlobalVariablesService} from "./globalVariables.service";
import {Clients} from "../models/clients";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {ClientsWarehouse} from "../models/clients-warehouse";
import {ClientsBranchOffice} from "../models/clients-branch-office";

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

  listAll(): Observable<any> {
    return this.http.get<Clients[]>(this.variables.getServiceEndpoint() + '/clients/all/', {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(client: Clients): Observable<any> {
    return this.http.post<Clients>(this.variables.getServiceEndpoint() + '/clients', client, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  updateClient(client: Clients, clientId: any): Observable<any> {
    return this.http.put<Clients>(this.variables.getServiceEndpoint() + '/clients/' + clientId, client, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findById(id: string | null): Observable<any> {
    return this.http.get<Clients[]>(this.variables.getServiceEndpoint() + '/clients/' + id, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  warehouseFindById(id: string | undefined | null): Observable<any> {
    return this.http.get<ClientsWarehouse>(this.variables.getServiceEndpoint() + '/clients/warehouse/id/' + id, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  warehouseFindByBranchId(id: string | undefined | null): Observable<any> {
    return this.http.get<ClientsWarehouse>(this.variables.getServiceEndpoint() + '/clients/warehouse/branch/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  branchFindById(id: string | undefined | null): Observable<any> {
    return this.http.get<ClientsBranchOffice>(this.variables.getServiceEndpoint() + '/clients/branches/id/' + id, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  branchFindByClient(clientId: string | undefined | null): Observable<any> {
    return this.http.get<ClientsBranchOffice>(this.variables.getServiceEndpoint() + '/clients/branches/client/' + clientId, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

}
