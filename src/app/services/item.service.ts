import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {IssuingsAccessUsersService} from "./issuings-access-users.service";
import {catchError} from "rxjs/operators";
import {Item} from "../models/item";
import {ItemMeasures} from "../models/item-measures";
import {GlobalVariablesService} from "./globalVariables.service";
import { ItemPrices } from '../models/item-prices';
import {Cabys} from "../models/cabys";
import {Currency} from "../models/currency";
import {ItemFamily} from "../models/item-family";
import {ItemDepartment} from "../models/item-department";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private router: Router, private variables: GlobalVariablesService) {}

  private notAllowed(err: { status: number; }): boolean {
    return err.status == 401 || err.status == 403;
  }

  public listAll(page: number, size: number): Observable<any> {
    let branchId = sessionStorage.getItem('branchId');
    return this.http.get<IssuingsAccessUsersService[]>(this.variables.getServicingEndpoint() + '/items/find/' + branchId + '/' + page + '/' + size, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public findByCodes(code: string): Observable<any> {
    let branchId = sessionStorage.getItem('branchId');
    return this.http.get<Item>(this.variables.getServicingEndpoint() + '/items/findCode/' + branchId + '/' + code, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public listMeasures(): Observable<any> {
    let itemId = sessionStorage.getItem('itemId');
    return this.http.get<(ItemMeasures[])>(this.variables.getServicingEndpoint() + '/items/findMeasuresBy/' + itemId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public save(item:Item): Observable<any>{
    return this.http.post<Item[]>(this.variables.getServicingEndpoint() + '/items/item/', item, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public findById(): Observable<any> {
    let itemId = sessionStorage.getItem('itemId');
    return this.http.get<(Item)>(this.variables.getServicingEndpoint() + '/items/findId/' + itemId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public findMeasureById(): Observable<any> {
    let itemId = sessionStorage.getItem('itemId');
    return this.http.get<(ItemMeasures[])>(this.variables.getServicingEndpoint() + '/items/findMeasuresBy/' + itemId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public findPriceById(): Observable<any> {
    let itemId = sessionStorage.getItem('itemId');
    return this.http.get<(ItemPrices)>(this.variables.getServicingEndpoint() + '/items/findPriceBy/' + itemId, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public updateItem(item: Item): Observable<any> {
    return this.http.put(this.variables.getServicingEndpoint() + '/items/item-v2/' + item.id, item, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }
  public loadCabys():Observable<any>{
    return this.http.get(this.variables.getServicingEndpoint()+'/extras/cabys/all',{headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public saveMeasures(measures: ItemMeasures):Observable<any>{
    return this.http.post(this.variables.getServicingEndpoint() +'/items/itemMeasures/', measures, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public updateMeasures(measures: ItemMeasures): Observable<any> {
    return this.http.put(this.variables.getServicingEndpoint() + '/items/itemMeasures/' + measures.id, measures, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public updatePrices(prices: ItemPrices): Observable<any> {
    return this.http.put(this.variables.getServicingEndpoint() + '/items/itemPrices/' + prices.id, prices, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public savePrices(prices: ItemPrices):Observable<any>{
    return this.http.post(this.variables.getServicingEndpoint() +'/items/itemPrices/', prices, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public searchCabys(param: string):Observable<any>{
    return this.http.get<Cabys>(this.variables.getServicingEndpoint() +'/extras/cabys/search/' + param, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public currencyById(id: number):Observable<any>{
    return this.http.get<Currency>(this.variables.getServicingEndpoint() +'/items/currency/' + id, {headers: this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public findFamilyAll() : Observable<any>{
    return this.http.get<ItemFamily>(this.variables.getServicingEndpoint() + '/items-additional/family/', {headers:this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public findFamilyById(id: number) : Observable<any>{
    return this.http.get<ItemFamily>(this.variables.getServicingEndpoint() + '/items-additional/family/' + id,
      {headers:this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }

  public findDepartmentAll() : Observable<any>{
    return this.http.get<ItemDepartment>(this.variables.getServicingEndpoint() + '/items-additional/department/', {headers:this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }
  public findDepartmentById(id: number) : Observable<any>{
    return this.http.get<ItemDepartment>(this.variables.getServicingEndpoint() + '/items-additional/department/' + id,
      {headers:this.variables.getAuthHeader()})
      .pipe(catchError(err => {
        this.notAllowed(err);
        return throwError(err);
      }));
  }


}
