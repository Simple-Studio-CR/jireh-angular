import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../../models/user.model';
import {environment} from '../../../../../environments/environment';

const API_USERS_URL = `${environment.baseUrl}/auth`;
const API_ZUUL = `${environment.baseUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  private _user: UserModel | null;
  private _token: string | null;


  constructor(private http: HttpClient) {
  }

  public get user(): UserModel {

    if (this._user != null) {
      return this._user;

    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(<string>sessionStorage.getItem('user')) as UserModel;
      return this._user;
    }
    return new UserModel();
  }

  public get token(): string | null{

    if(this._token != null){
      return this._token;

    } else if (this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return <string>this._token;
    }

    return null;
  }

  // public methods
  login(user: UserModel): Observable<any> {
    const endPoint = `${API_ZUUL}api/security/oauth/token`;
    const credentials = btoa('jirehApp' + ':' + 'muyseguro');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.userName);
    params.set('password', user.password);
    return this.http.post<any>(endPoint, params.toString(), {headers: httpHeaders});
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string | null): Observable<UserModel> {
    let token1 = this.token;
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_ZUUL}api/servicing/v1/search/findUserName?username=andres`, {
      headers: httpHeaders,
    });
  }

  saveUser(access_token: string):void {
    let payload = this.getTokenDetail(access_token);
    this._user = new UserModel();
    this._user.userName = payload.user_name;
    this._user.name = payload.name;
    this._user.lastName1 = payload.last_name;
    this._user.email = payload.email;
    this._user.authorities = payload.authorities;
    this._user.id = payload.id;
    sessionStorage.setItem('user',JSON.stringify(this._user));
  }
  saveToken(access_token: string):void{
    this._token = access_token;
    sessionStorage.setItem("token",access_token);
  }


  getTokenDetail(access_token: string | null):any{
    if(access_token != null){
      return JSON.parse(atob(access_token.split(".")[1]));
    }
    return null;
  }

  saveUserName(access_token:string):any{
    let payload= this.getTokenDetail(access_token);
    let username = payload.user_name;
    let id = payload.id;
    sessionStorage.setItem("userName",username);
    sessionStorage.setItem('userId', id);

  }

  isAuthenticated(): boolean{

    let payload = this.getTokenDetail(this.token);
    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }

  isIssuingLogin(): boolean{
    let emisor = sessionStorage.getItem('emisorId');
    let branchId = sessionStorage.getItem('branchId');
    return <boolean><unknown>emisor && branchId != null;
  }

  logout() {
    this._user = null;
    this._token = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    // @ts-ignore
    if (this.user.authorities.includes(role)) {
      return true;
    }
    return false;
  }

}
