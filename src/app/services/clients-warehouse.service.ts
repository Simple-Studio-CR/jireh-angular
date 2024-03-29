import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ClientsWarehouse} from "../models/clients-warehouse";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ClientsWarehouseService {
  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  findByBranchId(branchId: any, page: number, size: number): Observable<any> {
    return this.http.get<ClientsWarehouse[]>(this.variables.getServicingEndpoint() + '/clients/warehouse/branch/' + branchId + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(warehouse: ClientsWarehouse): Observable<any> {
    return this.http.post<ClientsWarehouse[]>(this.variables.getServicingEndpoint() + '/clients/warehouse/', warehouse, {})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  edit(warehouse: ClientsWarehouse, id: number | null): Observable<any> {
    return this.http.put<ClientsWarehouse[]>(this.variables.getServicingEndpoint() + '/clients/edit-warehouse/' + id, warehouse, {})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
