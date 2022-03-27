import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {GlobalVariablesService} from "./globalVariables.service";
import {ItemProvider} from "../models/item-provider";
import {AuthService} from "../modules/auth";
import {IssuingBranch} from "../models/issuing-branch";

@Injectable({
  providedIn: 'root'
})
export class ItemProviderService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public listAll(providerCode: number, branch: IssuingBranch, page: number, size: number): Observable<any> {
    return this.http.post<ItemProvider[]>(this.variables.getServicingEndpoint() + '/item-providers/find/' + providerCode + '/' + page + '/' + size, branch, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public save(item: ItemProvider): Observable<any> {
    return this.http.post<ItemProvider[]>(this.variables.getServicingEndpoint() + '/item-providers/save/', item, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
