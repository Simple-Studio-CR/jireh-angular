import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ClientsWarehouse} from "../models/clients-warehouse";

@Injectable({
  providedIn: 'root'
})
export class ClientsWarehouseService {
  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  findByBranchId(branchId: any): Observable<any> {
    return this.http.get<ClientsWarehouse[]>(this.variables.getServiceEndpoint() + '/clients/warehouse/branch/' + branchId, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(warehouse: ClientsWarehouse): Observable<any> {
    return this.http.post<ClientsWarehouse[]>(this.variables.getServiceEndpoint() + '/clients/warehouse/', warehouse, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  edit(warehouse: ClientsWarehouse, id: number | null): Observable<any> {
    return this.http.put<ClientsWarehouse[]>(this.variables.getServiceEndpoint() + '/clients/edit-warehouse/' + id, warehouse, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
