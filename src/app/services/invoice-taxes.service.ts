import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {IssuingsAccessUsersService} from "./issuings-access-users.service";
import {catchError} from "rxjs/operators";
import {InvoiceTaxes} from "../models/invoice-taxes";
import {AuthService} from "../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class InvoiceTaxesService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }
  public listAll(): Observable<any> {
    return this.http.get<InvoiceTaxes>(this.variables.getServicingEndpoint() + '/extras/taxes/all/', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
