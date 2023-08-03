/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */


import {Injectable} from "@angular/core";
import {ClientsBranchesService} from "../../services/clients-branches.service";

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() {
  }

  fechaActual(): string {
    let today = new Date();
    let dd: any = today.getDate() + 1;
    if (dd < 10) {
      dd = '0' + dd;
    }
    let mm: any = today.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm;
    }
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  primerDiaMes(): string {
    let today = new Date();
    let mm: any = today.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm;
    }
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + '01';
  }

  ultimoDiaMes(): any {
    let today = new Date();
    let mm: any = today.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12) {
      return today.getFullYear() + '-' + mm + '-' + '31';
    }
    if (mm == 2 || mm == 4 || mm == 6 || mm == 9 || mm == 11) {
      return today.getFullYear() + '-' + mm + '-' + '30';
    }
  }
}
