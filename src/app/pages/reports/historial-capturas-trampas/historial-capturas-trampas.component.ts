/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {TrampasGomosasService} from "../../../services/trampas-gomosas.service";
import {FunctionsService} from "../../common/functions.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

interface Reporte {
  trampa: any;
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  setiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;

  [key: string]: number | undefined; // <- esta es la línea que añades

}

const REPORTE_DATA: Reporte[] = [];

@Component({
  selector: 'app-historial-capturas-trampas',
  templateUrl: './historial-capturas-trampas.component.html',
  styleUrls: ['./historial-capturas-trampas.component.scss']
})
export class HistorialCapturasTrampasComponent implements OnInit, OnDestroy, AfterViewInit{

  displayedColumns: string[] = ['trampa', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
    'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
  dataSource = new MatTableDataSource(REPORTE_DATA);
  range: FormGroup;
  // Arreglo para almacenar información sobre las sucursales del cliente
  branches: ClientsBranchOffice[];
  clientId: any;
  trampas: any[] = [];
  functions = new FunctionsService();

  constructor(
    private service: TrampasGomosasService,
    private cd: ChangeDetectorRef,
    private branchService: ClientsBranchesService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this._initForm();
    this.cargarDatosV2(15)
  }

  ngOnDestroy() {
    this._liveAnnouncer.clear();
  }

  _initForm() {
    this.range = new FormGroup({
      branch: new FormControl(),
      trampa: new FormControl(),
    });
    this.findBranches();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  findBranches() {
    this.clientId = sessionStorage.getItem('clientId');
    this.branchService.findByClientId(Number.parseInt(this.clientId), 1, 200).subscribe(
      c => {
        this.branches = c.content;
        this.cd.detectChanges();
        this.range.controls.branch.valueChanges.subscribe(b => {
          this.cargarDatosV2(b.id);
          this.cd.detectChanges();
        })
      });
  }

  cargarDatosV2(branchId: any) {
    this.service.findReportePorAnio(branchId, this.functions.anioActual()).subscribe((res: any) => {
      this.dataSource.data = this.transformData(res);
      console.log('Datos cargados:', this.dataSource.data); // Muestra los datos cargados
      console.log('Total Enero:', this.totalEnero);
    });
  }

  get totalEnero(): number {
    return this.dataSource?.data.map(t => t.enero).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalFebrero(): number {
    return this.dataSource?.data.map(t => t.febrero).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalMarzo(): number {
    return this.dataSource?.data.map(t => t.marzo).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalAbril(): number {
    return this.dataSource?.data.map(t => t.abril).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalMayo(): number {
    return this.dataSource?.data.map(t => t.mayo).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalJunio(): number {
    return this.dataSource?.data.map(t => t.junio).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalJulio(): number {
    return this.dataSource?.data.map(t => t.julio).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalAgosto(): number {
    return this.dataSource?.data.map(t => t.agosto).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalSetiembre(): number {
    return this.dataSource?.data.map(t => t.setiembre).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalOctubre(): number {
    return this.dataSource?.data.map(t => t.octubre).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalNoviembre(): number {
    return this.dataSource?.data.map(t => t.noviembre).reduce((acc, value) => acc + value, 0) || 0;
  }

  get totalDiciembre(): number {
    return this.dataSource?.data.map(t => t.diciembre).reduce((acc, value) => acc + value, 0) || 0;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      this.cd.detectChanges();
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  transformData(response: any): Reporte[] {
    const result: Reporte[] = [];

    // Usamos un conjunto para evitar trampas duplicadas
    const trampasSet = new Set<number>();

    // Recorrer todos los meses en la respuesta
    for (let month in response) {
      // Recorrer todas las fechas dentro del mes
      for (let day in response[month]) {
        // Recorrer todas las trampas dentro de esa fecha
        for (let trapId in response[month][day]) {
          trampasSet.add(Number(trapId));
        }
      }
    }

    // Por cada trampa única, construir el objeto Reporte
    trampasSet.forEach(trampaId => {
      const reporte: Reporte = {
        trampa: trampaId,
        enero: 0,
        febrero: 0,
        marzo: 0,
        abril: 0,
        mayo: 0,
        junio: 0,
        julio: 0,
        agosto: 0,
        setiembre: 0,
        octubre: 0,
        noviembre: 0,
        diciembre: 0
      };

      for (let month in response) {
        for (let day in response[month]) {
          if (response[month][day][trampaId]) {
            // Incrementar el conteo para el mes si hay algún insecto, roedor o suciedad
            if (response[month][day][trampaId].insectos || response[month][day][trampaId].sucia || response[month][day][trampaId].roedor) {
              (reporte as any)[month]++;
            }
          }
        }
      }

      result.push(reporte);
    });

    return result;
  }

}
