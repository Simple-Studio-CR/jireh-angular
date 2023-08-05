import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../modules/auth";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {Users} from "../models/users";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {UserAuthRegister} from "../models/user-auth-register";
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class userAuthRegisterService {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService) {
  }


  public findUserAuthRegister(user: string, auth: string | null, pageNo: number, pageSize: number): Observable<any> {
    return this.http.get<UserAuthRegister>(this.variables.getServicingEndpoint() + '/users/get-user-by-auth/' + auth +'/'+ pageNo +'/'+ pageSize, {headers: this.variables.getAuthHeader()}).
    pipe(catchError(err => {
          console.log('el error status es : ', err.status)
          this.variables.notAllowed(err);
          return throwError(err);
        }
      )
    );
  }
}
