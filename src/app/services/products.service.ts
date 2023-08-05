import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {Clients} from "../models/clients";
import {catchError} from "rxjs/operators";
import {Products} from "../models/products";
import {AuthService} from "../modules/auth";
import {ListProducts} from "../models/list-products";
import {ActiveIngredient} from "../models/active-ingredient";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  listAll(pageNo: number, pageSize: number): Observable<any> {
    return this.http.get<ListProducts[]>(this.variables.getServicingEndpoint() + '/products/all/' + pageNo + '/' + pageSize, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(products: Products): Observable<any> {
    return this.http.post<Products>(this.variables.getServicingEndpoint() + '/products', products, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  updateClient(products: Products): Observable<any> {
    return this.http.put<Products>(this.variables.getServicingEndpoint() + '/products/update/' + products.id, products, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findById(id: string | null): Observable<any> {
    return this.http.get<Products[]>(this.variables.getServicingEndpoint() + '/products/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findIngredientsList(): Observable<any> {
    return this.http.get<ActiveIngredient>(this.variables.getServicingEndpoint() + '/active-ingredients/all', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  saveListProduct(objectListForSave: any): Observable<any> {
    return this.http.post<ActiveIngredient>(this.variables.getServicingEndpoint() + '/products/save-list-products', objectListForSave, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  getListProductsAll(): Observable<any> {
    return this.http.get<ListProducts>(this.variables.getServicingEndpoint() + '/products/all-list-products/1/2000', {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
            this.variables.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
