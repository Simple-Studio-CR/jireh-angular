import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment"
import {AuthHTTPService} from "../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  constructor(private http: HttpClient, private authHttpService: AuthHTTPService, private router: Router) {
  }

  public notAllowed(err: { status: number; }): boolean {
    if(err.status== 404){
      swal.fire({
        title: 'Error',
        text: 'No se encontró el recurso',
        icon: 'error',
      })
      this.router.navigate(['/reports']);
      return true;
    }
    if(err.status == 401){
      swal.fire({
        title: 'Error',
        text: 'No tiene permisos para acceder a este recurso',
        icon: 'error',
      })
      this.router.navigate(['/login']);
      return true;
    }
    if(err.status == 403){
      swal.fire({
        title: 'Error',
        text: 'No tiene permisos para acceder a este recurso',
        icon: 'error',
      })
      this.router.navigate(['/reports']);
      return true;
    }
    return false;
  }

  public getServicingEndpoint() {
    return this.getBaseEndpoint() + 'api/servicing';
  }
  public getServiceEndpoint() {
    return this.getBaseEndpoint() + 'api/service';
  }

  public getAuthEndpoint() {
    return environment.authUrl;

  }

  public getBaseEndpoint() {
    return environment.baseUrl;
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
