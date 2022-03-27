import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {IssuingBranch} from "../models/issuing-branch";
import {Observable, throwError} from "rxjs";
import {ItemDepartment} from "../models/item-department";
import {catchError} from "rxjs/operators";
import {ItemFamily} from "../models/item-family";

@Injectable({
  providedIn: 'root'
})
export class ItemDepartmentService{

  constructor(private http: HttpClient, private router: Router, private variables: GlobalVariablesService) {}

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public listAll(branch: IssuingBranch): Observable<any>{
    return this.http.post<ItemDepartment>(this.variables.getServicingEndpoint()+'/items-additional/department/', branch, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public listAllFamilies(branch: IssuingBranch): Observable<any>{
    return this.http.post<ItemFamily>(this.variables.getServicingEndpoint()+'/items-additional/family/', branch, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

}
