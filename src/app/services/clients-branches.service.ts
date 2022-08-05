import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ClientsBranchOffice} from "../models/clients-branch-office";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/utils";

@Injectable({
  providedIn: 'root'
})
export class ClientsBranchesService {

  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  findByClientId(clientId: any): Observable<any> {
    return this.http.get<ClientsBranchOffice[]>(this.variables.getServiceEndpoint() + '/clients/branches/client/' + clientId, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findById(id: any): Observable<any> {
    return this.http.get<ClientsBranchOffice[]>(this.variables.getServiceEndpoint() + '/clients/branches/id/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  saveBranch(client: ClientsBranchOffice | JsonObject): Observable<any> {
    return this.http.post<ClientsBranchOffice[]>(this.variables.getServiceEndpoint() + '/clients/branches', client, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  editBranch(branch: ClientsBranchOffice, id: string | null): Observable<any> {
    return this.http.put<ClientsBranchOffice[]>(this.variables.getServiceEndpoint() + '/clients/branches/' + id, branch, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

}
