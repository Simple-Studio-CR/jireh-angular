import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AddressProvince} from "../models/address-province";
import {AddressCanton} from "../models/address-canton";
import {GlobalVariablesService} from "./globalVariables.service";
import {AuthService} from "../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class AddressProvinceService {


  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public listAll(): Observable<any> {
    return this.http.get<AddressProvince[]>(this.variables.getServicingEndpoint() + "/province/", {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public listCanton(province: any): Observable<any> {
    return this.http.get<AddressCanton[]>(this.variables.getServicingEndpoint()+ "/province/canton/"+ province, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public listDistrict(canton: any): Observable<any> {
    return this.http.get<AddressCanton[]>(this.variables.getServicingEndpoint() + "/province/district/"+ canton, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
  public listNeigh(district: any): Observable<any> {
    return this.http.get<AddressCanton[]>(this.variables.getServicingEndpoint() + "/province/neigh/"+ district, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
