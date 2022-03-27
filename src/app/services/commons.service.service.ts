import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {IdentificationType} from "../models/identification-type";

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  private endPoint = 'http://147.182.129.53:8090/api/servicing';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  private addAuthHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private notAllowed(err): boolean {
    if (err.status == 401 || err.status == 403) {
      this.router.navigate['/login'];
      return true;
    }
    return false;
  }

  public identificationType(identId:number): Observable<any>{
    return this.http.get<IdentificationType[]>(this.endPoint + '/clients/branch/' + identId, {headers: this.addAuthHeader()})
      .pipe(catchError(err => {
            this.notAllowed(err);
            return throwError(err);
          }
        )
      );
  }
}
