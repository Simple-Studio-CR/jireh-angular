import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Users} from "../models/users";
import {GlobalVariablesService} from "./globalVariables.service";

@Injectable({
  providedIn: 'root'
})
export class allowedService {

  private _user: Users;
  private _token: string;

  constructor(private http: HttpClient) { }

  static notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }
}
