import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "./globalVariables.service";
import {AuthService} from "../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,
              private variables: GlobalVariablesService)  { }

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }


}
