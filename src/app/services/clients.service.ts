import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {GlobalVariablesService} from "./globalVariables.service";
import {Clients} from "../models/clients";
import {ClientsWarehouse} from "../models/clients-warehouse";
import {ClientsBranchOffice} from "../models/clients-branch-office";

// noinspection LanguageDetectionInspection
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient, private variables: GlobalVariablesService) {
  }

  /**
   * Obtiene una lista de clientes paginada.
   * @param page Número de página.
   * @param size Tamaño de página.
   * @returns Observable con la lista de clientes.
   */
  listAll(page: number, size: number): Observable<any> {
    return this.http.get<Clients[]>(
      this.variables.getServicingEndpoint() + '/clients/all/' + page + '/' + size,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Guarda un nuevo cliente.
   * @param client Datos del cliente a guardar.
   * @returns Observable con el cliente guardado.
   */
  save(client: Clients): Observable<any> {
    return this.http.post<Clients>(
      this.variables.getServicingEndpoint() + '/clients',
      client,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Actualiza los datos de un cliente existente.
   * @param client Datos del cliente a actualizar.
   * @param clientId ID del cliente a actualizar.
   * @returns Observable con los detalles del cliente actualizado.
   */
  updateClient(client: Clients, clientId: any): Observable<any> {
    return this.http.put<Clients>(
      this.variables.getServicingEndpoint() + '/clients/' + clientId,
      client,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene los detalles de un cliente por su ID.
   * @param id ID del cliente a buscar.
   * @returns Observable con los detalles del cliente.
   */
  findById(id: number | null): Observable<any> {
    return this.http.get<Clients[]>(
      this.variables.getServicingEndpoint() + '/clients/' + id,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene los detalles de un almacén de cliente por su ID.
   * @param id ID del almacén a buscar.
   * @returns Observable con los detalles del almacén.
   */
  warehouseFindById(id: string | undefined | null): Observable<any> {
    return this.http.get<ClientsWarehouse>(
      this.variables.getServicingEndpoint() + '/clients/warehouse/id/' + id,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene una lista de almacenes de cliente por ID de sucursal y paginación.
   * @param id ID de la sucursal para la cual se obtienen los almacenes.
   * @param page Número de página.
   * @param size Tamaño de página.
   * @returns Observable con la lista de almacenes de cliente.
   */
  warehouseFindByBranchId(id: any, page: number, size: number): Observable<any> {
    return this.http.get<ClientsWarehouse>(
      this.variables.getServicingEndpoint() + '/clients/warehouse/branch/' + id + '/' + page + '/' + size,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene los detalles de una sucursal de cliente por su ID.
   * @param id ID de la sucursal a buscar.
   * @returns Observable con los detalles de la sucursal de cliente.
   */
  branchFindById(id: any): Observable<any> {
    return this.http.get<ClientsBranchOffice>(
      this.variables.getServicingEndpoint() + '/clients/branches/id/' + id,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Obtiene una lista de sucursales de cliente por ID de cliente y paginación.
   * @param clientId ID del cliente para el cual se obtienen las sucursales.
   * @returns Observable con la lista de sucursales de cliente.
   */
  branchFindByClient(clientId: any): Observable<any> {
    return this.http.get<ClientsBranchOffice>(
      this.variables.getServicingEndpoint() + '/clients/branches/client/' + clientId + '/' + 1 + '/' + 5000,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Guarda un nuevo almacén de cliente.
   * @param warehouse Datos del almacén a guardar.
   * @returns Observable con el almacén de cliente guardado.
   */
  saveWarehouse(warehouse: ClientsWarehouse): Observable<any> {
    return this.http.post<ClientsWarehouse[]>(
      this.variables.getServicingEndpoint() + '/clients/warehouse',
      warehouse,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }

  /**
   * Edita un almacén de cliente existente.
   * @param warehouse Datos del almacén a editar.
   * @param id ID del almacén a editar.
   * @returns Observable con los detalles del almacén editado.
   */
  editWarehouse(warehouse: ClientsWarehouse, id: number | null): Observable<any> {
    return this.http.put<ClientsWarehouse[]>(
      this.variables.getServicingEndpoint() + '/clients/edit-warehouse/' + id,
      warehouse,
      {headers: this.variables.getAuthHeader()}
    ).pipe(catchError(err => {
      this.variables.notAllowed(err);
      return throwError(err);
    }));
  }
}
