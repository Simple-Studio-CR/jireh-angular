import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {Equipment} from "../models/equipment";
import {catchError} from "rxjs/operators";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class EquipmentService{
  constructor(private http: HttpClient, private authService: AuthHTTPService, private router: Router,
              private variables: GlobalVariablesService) {
  }


  listAll(): Observable<any>{
    return this.http.get<Equipment[]>(this.variables.getServicingEndpoint() + '/equipment/all', {headers:this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
