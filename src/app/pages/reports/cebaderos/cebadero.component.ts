/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {CebaderosService} from "../../../services/cebadero.service";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {ClientsWarehouseService} from "../../../services/clients-warehouse.service";
import {Router} from "@angular/router";
import {UiService} from "../../../services/ui.service";

import {FunctionsService} from "../../common/functions.service";
import {CebaderosReport} from "../../../models/cebadero-report";
import Swal from "sweetalert2";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";


@Component({
  selector: 'app-historial-capturas-trampas',
  templateUrl: './cebadero.component.html',
  styleUrls: ['./cebadero.component.scss']
})
export class CebaderoComponent implements OnInit, OnDestroy, AfterViewInit {

  range: FormGroup;
  clientId: any;
  branchId: any;
  functions: FunctionsService = new FunctionsService();
  reportData: CebaderosReport = {};
  months: string[] = [];
  cebaderos: string[] = [];
  reportArray: { month: string, days: any[] }[] = [];
  branches: ClientsBranchOffice[];

  constructor(
    private service: CebaderosService,
    private branchService: ClientsBranchesService,
    private wareHouseService: ClientsWarehouseService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private uiService: UiService,
  ) {}

  ngOnInit() {
    this.manageSessionStorage();
    this._initForm();
  }

  ngOnDestroy() {}

  ngAfterViewInit() {}

  _initForm() {
    this.range = new FormGroup({
      branch: new FormControl(),
      trampa: new FormControl(),
    });
    this.findBranches();
  }

  findBranches() {
    this.clientId = sessionStorage.getItem('clientId');
    this.branchService.findByClientId(Number.parseInt(this.clientId), 1, 200).subscribe(
      c => {
        this.branches = c.content;
        this.cd.detectChanges();
        this.range.controls.branch.valueChanges.subscribe(b => {
          this.cargarDatos(b.id);
          this.cd.detectChanges();
        })
      });
  }

  private cargarDatos(id: number) {
    this.service.getDetailedReport(id, this.functions.anioActual()).subscribe(data => {
      this.reportData = data;

      if (data && Object.keys(data).length > 0) {
        this.months = Object.keys(data);

        let allCebaderosSet = new Set<string>();

        for (let month of this.months) {
          for (let day in data[month]) {
            for (let cebadero in data[month][day]) {
              allCebaderosSet.add(cebadero);
            }
          }
        }

        this.cebaderos = Array.from(allCebaderosSet).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

        // Convertimos reportData a un formato de array para la iteración
        this.reportArray = this.months.map(month => ({
          month: month,
          days: Object.keys(data[month]).map(day => ({
            day: day,
            values: data[month][day]
          }))
        }));
      }

      console.log(this.reportArray);
      this.cd.detectChanges();
    });
  }

  getTrueCountForDay(month: string, day: string): number {
    let count = 0;
    this.cebaderos.forEach(cebadero => {
      if (this.reportData[month][day][cebadero]) {
        count++;
      }
    });
    return count;
  }

  private manageSessionStorage(): void {
    // Obtener el 'clientId' almacenado en sessionStorage
    this.clientId = sessionStorage.getItem('clientId');

    // Obtener el 'branchId' almacenado en sessionStorage
    this.branchId = sessionStorage.getItem('branchId');

    // Eliminar el elemento 'reports' de sessionStorage si existe
    sessionStorage.removeItem('reports');
  }

  editCebaderoValue(month: string, day: string, cebadero: string) {
    const cebaderoValue = this.reportData[month][day][cebadero];

    Swal.fire({
      title: 'Editar Cebadero: ' + cebadero + ' del dia ' + day + ' de ' + month,
      html: `
      <div>
        <input type="checkbox" id="cebaderoValue" ${cebaderoValue ? 'checked' : ''}> Cebadero
      </div>
    `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          cebaderoValue: (document.getElementById('cebaderoValue') as HTMLInputElement).checked
        }
      }
    }).then(result => {
      if (result.isConfirmed) {
        console.log(result.value);
        console.log('aqui se actualiza el valor del cebadero');
      }
    });
  }


  calculateTotalForCebadero(cebadero: string): number {
    let total = 0;

    for (let monthData of this.reportArray) {
      for (let dayData of monthData.days) {
        if (dayData.values[cebadero]) {
          total++;
        }
      }
    }

    return total;
  }

}
