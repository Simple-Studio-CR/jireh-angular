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

  listAll(page: number, size: number): Observable<any> {
    return this.http.get<Clients[]>(this.variables.getServicingEndpoint() + '/clients/all/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(client: Clients): Observable<any> {
    return this.http.post<Clients>(this.variables.getServicingEndpoint() + '/clients', client, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  updateClient(client: Clients, clientId: any): Observable<any> {
    return this.http.put<Clients>(this.variables.getServicingEndpoint() + '/clients/' + clientId, client, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findById(id: string | null): Observable<any> {
    return this.http.get<Clients[]>(this.variables.getServicingEndpoint() + '/clients/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  warehouseFindById(id: string | undefined | null): Observable<any> {
    return this.http.get<ClientsWarehouse>(this.variables.getServicingEndpoint() + '/clients/warehouse/id/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  warehouseFindByBranchId(id: number | undefined | null, page: number,  size: number): Observable<any> {
    return this.http.get<ClientsWarehouse>(this.variables.getServicingEndpoint() + '/clients/warehouse/branch/' + id + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  branchFindById(id: number | undefined | null): Observable<any> {
    return this.http.get<ClientsBranchOffice>(this.variables.getServicingEndpoint() + '/clients/branches/id/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  branchFindByClient(clientId: number | undefined | null): Observable<any> {
    return this.http.get<ClientsBranchOffice>(this.variables.getServicingEndpoint() + '/clients/branches/client/' + clientId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  saveWarehouse(warehouse: ClientsWarehouse): Observable<any> {
    return this.http.post<ClientsWarehouse[]>(this.variables.getServicingEndpoint() + '/clients/warehouse', warehouse, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  editWarehouse(warehouse: ClientsWarehouse, id: number | null): Observable<any> {
    return this.http.put<ClientsWarehouse[]>(this.variables.getServicingEndpoint() + '/clients/edit-warehouse/' + id, warehouse, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

}
