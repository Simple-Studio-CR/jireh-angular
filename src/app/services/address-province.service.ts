import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AddressProvince} from "../models/address-province";
import {AddressCanton} from "../models/address-canton";
import {GlobalVariablesService} from "./globalVariables.service";
import {AuthService} from "../modules/auth";
import {AddressNeighborhood} from "../models/address-neighborhood";
import {AddressDistrict} from "../models/address-district";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AddressProvinceService {


  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }


  public listAll(): Observable<any> {
    return this.http.get<AddressProvince[]>(this.variables.getServicingEndpoint() + "/address/province/", {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findProvinceById(id: number): Observable<any> {
    return this.http.get<AddressProvince>(this.variables.getServicingEndpoint() + "/address/province/id/" + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public listCanton(province: any): Observable<any> {
    return this.http.get<AddressCanton[]>(this.variables.getServicingEndpoint() + "/address/canton/" + province, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findCantonById(id: number): Observable<any> {
    return this.http.get<AddressCanton>(this.variables.getServicingEndpoint() + "/address/canton/id/" + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public listDistrict(canton: any): Observable<any> {
    return this.http.get<AddressDistrict[]>(this.variables.getServicingEndpoint() + "/address/distrito/" + canton, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findDistrictById(id: number): Observable<any> {
    return this.http.get<AddressDistrict>(this.variables.getServicingEndpoint() + "/address/distrito/id/" + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public listNeigh(district: any): Observable<any> {
    return this.http.get<AddressNeighborhood[]>(this.variables.getServicingEndpoint() + "/address/neigh/" + district, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  public findNeightById(id: number): Observable<any> {
    return this.http.get<AddressNeighborhood>(this.variables.getServicingEndpoint() + "/address/neigh/id/" + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
