import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {GlobalVariablesService} from "./globalVariables.service";
import {AddressProvince} from "../models/address-province";
import {AddressCanton} from "../models/address-canton";
import {AddressDistrict} from "../models/address-district";
import {AddressNeighborhood} from "../models/address-neighborhood";

@Injectable({
  providedIn: 'root'
})
export class AddressProvinceService {

  constructor(private http: HttpClient, private variables: GlobalVariablesService) {
  }

  /**
   * Obtiene la lista de todas las provincias.
   * @returns Observable con la lista de provincias.
   */
  public listAll(): Observable<AddressProvince[]> {
    return this.http.get<AddressProvince[]>(
      this.variables.getServicingEndpoint() + "/address/province/",
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Busca una provincia por su ID.
   * @param id ID de la provincia a buscar.
   * @returns Observable con los detalles de la provincia.
   */
  public findProvinceById(id: number): Observable<AddressProvince> {
    return this.http.get<AddressProvince>(
      this.variables.getServicingEndpoint() + "/address/province/id/" + id,
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene la lista de cantones para una provincia específica.
   * @param province ID de la provincia para la cual se obtienen los cantones.
   * @returns Observable con la lista de cantones.
   */
  public listCanton(province: any): Observable<AddressCanton[]> {
    return this.http.get<AddressCanton[]>(
      this.variables.getServicingEndpoint() + "/address/canton/" + province,
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Busca un cantón por su ID.
   * @param id ID del cantón a buscar.
   * @returns Observable con los detalles del cantón.
   */
  public findCantonById(id: number): Observable<AddressCanton> {
    return this.http.get<AddressCanton>(
      this.variables.getServicingEndpoint() + "/address/canton/id/" + id,
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene la lista de distritos para un cantón específico.
   * @param canton ID del cantón para el cual se obtienen los distritos.
   * @returns Observable con la lista de distritos.
   */
  public listDistrict(canton: any): Observable<AddressDistrict[]> {
    return this.http.get<AddressDistrict[]>(
      this.variables.getServicingEndpoint() + "/address/distrito/" + canton,
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Busca un distrito por su ID.
   * @param id ID del distrito a buscar.
   * @returns Observable con los detalles del distrito.
   */
  public findDistrictById(id: number): Observable<AddressDistrict> {
    return this.http.get<AddressDistrict>(
      this.variables.getServicingEndpoint() + "/address/distrito/id/" + id,
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene la lista de vecindarios para un distrito específico.
   * @param district ID del distrito para el cual se obtienen los vecindarios.
   * @returns Observable con la lista de vecindarios.
   */
  public listNeigh(district: any): Observable<AddressNeighborhood[]> {
    return this.http.get<AddressNeighborhood[]>(
      this.variables.getServicingEndpoint() + "/address/neigh/" + district,
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Busca un vecindario por su ID.
   * @param id ID del vecindario a buscar.
   * @returns Observable con los detalles del vecindario.
   */
  public findNeightById(id: number): Observable<AddressNeighborhood> {
    return this.http.get<AddressNeighborhood>(
      this.variables.getServicingEndpoint() + "/address/neigh/id/" + id,
      { headers: this.variables.getAuthHeader() }
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }
}
