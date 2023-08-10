/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {LamparasCapturasMesService} from "../../../services/lamparas-capturas-mes.service";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsBranchesService} from "../../../services/clients-branches.service";

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import cptable from "@amcharts/amcharts4/.internal/bundled/xlsx/dist/cpexcel";

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
}

const REPORTE_DATA: Reporte[] = [];

@Component({
  selector: 'app-historial-capturas-lamparas',
  templateUrl: './historial-capturas-lamparas.component.html',
  styleUrls: ['./historial-capturas-lamparas.component.scss']
})

export class HistorialCapturasLamparasComponent implements OnInit, AfterViewInit {

  currentYear: number = new Date().getFullYear();

  displayedColumns: string[] = ['trampa', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
    'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
  dataSource = new MatTableDataSource(REPORTE_DATA);

  range: FormGroup;

  // Arreglo para almacenar información sobre las sucursales del cliente
  branches: ClientsBranchOffice[];

  clientId: any;

  trampas: any[] = [];

  totales: Reporte = {
    trampa: 0,
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
    diciembre: 0,
  };

  constructor(private service: LamparasCapturasMesService,
              private cd: ChangeDetectorRef,
              private branchService: ClientsBranchesService,
              private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this._initForm();
  }

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
          this.cargarDatosV2(b.id);
          this.cd.detectChanges();
        })
      });
  }

  cargarDatosV2(branchId: any) {
    let date = new Date();

    // Primero, adaptamos tu servicio para obtener los datos en el formato deseado:
    this.service.findReporteAnual(date.getFullYear(), branchId).subscribe(data => {
      let reportes: Reporte[] = [];
      // @ts-ignore
      data.forEach(item => {
        let reporte = reportes.find(r => r.trampa === item[2]);
        if (!reporte) {
          reporte = {
            trampa: item[2],
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
            diciembre: 0,
          };
          reportes.push(reporte);
        }
        switch (item[3]) {
          case 1:
            reporte.enero = item[0];
            break;

          case 2:
            reporte.febrero = item[0];
            break;

          case 3:
            reporte.marzo = item[0];
            break;

          case 4:
            reporte.abril = item[0];
            break;

          case 5:
            reporte.mayo = item[0];
            break;

          case 6:
            reporte.junio = item[0];
            break;

          case 7:
            reporte.julio = item[0];
            break;

          case 8:
            reporte.agosto = item[0];
            break;

          case 9:
            reporte.setiembre = item[0];
            break;

          case 10:
            reporte.octubre = item[0];
            break;

          case 11:
            reporte.noviembre = item[0];
            break;

          case 12:
            reporte.diciembre = item[0];
            break;
        }
      });
      this.dataSource.data = reportes;
      reportes.forEach(reporte => {
        this.totales.enero += reporte.enero;
        this.totales.febrero += reporte.febrero;
        this.totales.marzo += reporte.marzo;
        this.totales.abril += reporte.abril;
        this.totales.mayo += reporte.mayo;
        this.totales.junio += reporte.junio;
        this.totales.julio += reporte.julio;
        this.totales.agosto += reporte.agosto;
        this.totales.setiembre += reporte.setiembre;
        this.totales.octubre += reporte.octubre;
        this.totales.noviembre += reporte.noviembre;
        this.totales.diciembre += reporte.diciembre;
      });

      let datos: any[] = [];
      for (const reportesKey in reportes) {
        this.trampas.push(reportes[reportesKey].trampa);
      }
      console.log(this.trampas);
      this.range.controls.trampa.valueChanges.subscribe(t => {
        this.findReporteAnualPorNumeroTrampa(branchId, t, datos);
        this.cd.detectChanges();
      })
      this.createTrampaMonthlyChart(this.totales);

      this.cd.detectChanges();
    });
  }

  /** Announce the change in sort state for assistive technology. */
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

  eliminar(id: any) {
  }
  findReporteAnualPorNumeroTrampa(branchId: any, trampa: any, datos: any[]) {
    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'setiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];

    this.service.findReporteAnualPorNumeroTrampa(branchId, trampa).subscribe(data => {
      for (const dataKey in data) {
        datos.push({
          mes: meses[data[dataKey][1] - 1],
          valor: data[dataKey][0]
        })
      }
      this.createMonthlyTotalChart(datos, trampa);
      this.cd.detectChanges();

    });
  }

  createTrampaMonthlyChart(reporte: any) {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("totalChartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    // @ts-ignore
    chart.data = [
      {month: "Enero", value: reporte.enero},
      {month: "Febrero", value: reporte.febrero},
      {month: "Marzo", value: reporte.marzo},
      {month: "Abril", value: reporte.abril},
      {month: "Mayo", value: reporte.mayo},
      {month: "Junio", value: reporte.junio},
      {month: "Julio", value: reporte.julio},
      {month: "Agosto", value: reporte.agosto},
      {month: "Setiembre", value: reporte.setiembre},
      {month: "Octubre", value: reporte.octubre},
      {month: "Noviembre", value: reporte.noviembre},
      {month: "Diciembre", value: reporte.diciembre},
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.title.text = "Trampa";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Total de Consumo";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "month";
    series.dataFields.valueY = "value";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.stacked = true;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    this.cd.detectChanges();
  }

  createMonthlyTotalChart(totales: any, trampa : any) {

    console.log(totales, 'totales');

    let chart = am4core.create("trampaChartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = totales;

    console.log(chart.data, 'chart data');

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "mes";
    categoryAxis.title.text = "Trampa " + trampa;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Total de Consumo";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "mes";
    series.dataFields.valueY = "valor";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.stacked = true;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    this.cd.detectChanges();
  }


}
