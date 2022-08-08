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
  public getServiceEndpoint() {
    return this.getBaseEndpoint() + '/api/service';
  }

  public getAuthEndpoint() {
    return 'https://zuul-server-dit4h.ondigitalocean.app/api/security/oauth/token';
    // return 'http://localhost:8090/api/security/oauth/token';

  }

  public getBaseEndpoint() {
    return 'https://zuul-server-dit4h.ondigitalocean.app';
    // return 'http://localhost:8090';
  }

  private static getHeaders() {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  public getAuthHeader() {
    let token = this.authHttpService.token;
    if (token != null) {
      return GlobalVariablesService.getHeaders().append('Authorization', 'Bearer ' + token);
    }
    return GlobalVariablesService.getHeaders();
  }
}
