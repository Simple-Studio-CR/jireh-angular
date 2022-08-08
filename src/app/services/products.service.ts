import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Observable, throwError} from "rxjs";
import {Clients} from "../models/clients";
import {catchError} from "rxjs/operators";
import {Products} from "../models/products";
import {AuthService} from "../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  listAll(pageNo: number, pageSize: number): Observable<any> {
    return this.http.get<Products[]>(this.variables.getServiceEndpoint() + '/products/all/' + pageNo + '/' + pageSize, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  count(): Observable<any> {
    return this.http.get<number>(this.variables.getServiceEndpoint() + '/products/count/all', {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  save(products: Products): Observable<any> {
    return this.http.post<Products>(this.variables.getServiceEndpoint() + '/products', products, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  updateClient(products: Products): Observable<any> {
    return this.http.put<Products>(this.variables.getServiceEndpoint() + '/products/' + products.id, products, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }

  findById(id: string | null): Observable<any>{
    return this.http.get<Products[]>(this.variables.getServiceEndpoint() + '/products/' + id, {})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
