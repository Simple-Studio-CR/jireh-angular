import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../modules/auth";
import {AuthHTTPService} from "../modules/auth/services/auth-http";

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  constructor(private http: HttpClient, private authHttpService: AuthHTTPService) {
  }

  public getServicingEndpoint() {
    return this.getBaseEndpoint() + '/api/servicing';
  }

  public getAuthEndpoint() {
    // return 'http://147.182.129.53:8090/api/security/oauth/token';
    return 'http://localhost:8090/api/security/oauth/token';

  }

  public getBaseEndpoint() {
    // return 'http://147.182.129.53:8090';
    return 'http://localhost:8090';
  }

  static getHeaders() {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  static getHeadersMultiPart() {
    return new HttpHeaders({});
  }

  public getAuthHeader() {
    let token = this.authHttpService.token;
    if (token != null) {
      return GlobalVariablesService.getHeaders().append('Authorization', 'Bearer ' + token);
    }
    return GlobalVariablesService.getHeaders();
  }

  public getAuthHeaderMultiPart() {
    let token = this.authHttpService.token;
    if (token != null) {
      return GlobalVariablesService.getHeadersMultiPart().append('Authorization', 'Bearer ' + token);
    }
    return GlobalVariablesService.getHeaders();
  }
}
