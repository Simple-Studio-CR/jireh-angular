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

  private days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  private months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor() {
  }

  numberToMonth(monthNumber: number): string | null {
    if (monthNumber >= 0 && monthNumber < 12) {
      return this.months[monthNumber];
    }
    return null; // Retorna null si el número no es válido
  }

  // Convierte un string de mes a un número
  monthToNumber(monthName: string): number {
    const index = this.months.indexOf(monthName);
    if (index !== -1) {
      return index;
    }
    return -1; // Retorna -1 si el string del mes no es válido
  }

  numberToDay(dayNumber: number): string | null {
    if (dayNumber >= 0 && dayNumber < 7) {
      return this.days[dayNumber];
    }
    return null; // Retorna null si el número no es válido
  }

  // Convierte un string de día a un número
  dayToNumber(dayName: string): number {
    const index = this.days.indexOf(dayName);
    if (index !== -1) {
      return index;
    }
    return -1; // Retorna -1 si el string del día no es válido
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

  mesActual(): number {
    let today = new Date();
    return today.getMonth() + 1;
  }

  anioActual(): number {
    let today = new Date();
    return today.getFullYear();
  }
}
