/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../models/clients-warehouse";
import {FormControl, FormGroup} from "@angular/forms";
import {FunctionsService} from "../../common/functions.service";
import {TrampasGomosas} from "../../../models/trampas-gomosas";
import {Router} from "@angular/router";
import {TrampasGomosasService} from "../../../services/trampas-gomosas.service";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import Swal from "sweetalert2";
import {takeUntil} from 'rxjs/operators';
import {ClientsWarehouseService} from "../../../services/clients-warehouse.service";
import {Subject} from "rxjs";
import {UiService} from "../../../services/ui.service";

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-trampas-gomosas',
  templateUrl: './trampas-gomosas.component.html',
  styleUrls: ['./trampas-gomosas.component.scss']
})
export class TrampasGomosasComponent implements OnInit, OnDestroy {

  chartData: any[] = [];
  chart: am4charts.XYChart;
  clientId: any;
// Variable para almacenar el ID de la sucursal
  branchId: any;
// Arreglo para almacenar información sobre las sucursales del cliente
  branches: ClientsBranchOffice[];
// Arreglo para almacenar información sobre los almacenes del cliente
  warehouse: ClientsWarehouse[];
  private destroy$ = new Subject<void>();
  yearly: boolean = false;
  selectedFilter: string = 'roedor'; // Por defecto
// FormGroup para manejar los controles del formulario de nuevo conteo
  nuevoConteoForm: FormGroup;
// FormGroup para manejar los controles de un rango de fechas
  form: FormGroup;
  graphForm: FormGroup;
// Instancia del servicio 'FunctionsService' para funciones auxiliares
  functions: FunctionsService = new FunctionsService();
// Arreglo para almacenar información sobre los reportes de trampas gomosas por mes
  reports: TrampasGomosas[];

  constructor(
    private service: TrampasGomosasService,
    private branchService: ClientsBranchesService,
    private wareHouseService: ClientsWarehouseService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private uiService: UiService,
  ) {
  }

  ngOnInit(): void {
    this.manageSessionStorage();
    this.initializeForms();
    this.setFechaHoy();
    this._getBranches();


    this.graphForm.get('filter')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(selectedFilter => {
      this.selectedFilter = selectedFilter;
      this.cargarDatos();
    });
  }

  private initializeForms(): void {
    // Crear un FormGroup llamado 'range' para manejar un rango de fechas
    this.form = new FormGroup({
      branch: new FormControl(''), // Control para la sucursal (inicializado con cadena vacía)
      month: new FormControl(''), // Control para el mes (inicializado con cadena vacía)
    });

    this.graphForm = new FormGroup({
      filter: new FormControl(''), // Control para el filtro (inicializado con cadena vacía)
    });

    // Crear un FormGroup llamado 'nuevoConteoForm' para manejar el formulario de conteo de plagas
    this.nuevoConteoForm = new FormGroup({
      branchOffice: new FormControl(''), // Control para la sucursal (inicializado con cadena vacía)
      createAt: new FormControl(''),     // Control para la fecha de creación (inicializado con cadena vacía)
      warehouse: new FormControl(''),    // Control para el almacén (inicializado con cadena vacía)
      trampa: new FormControl(''),       // Control para el número de trampas (inicializado con cadena vacía)
      roedor: new FormControl(''),     // Control para el número de roedores (inicializado con cadena vacía)
      insectos: new FormControl(''),     // Control para el número de insectos (inicializado con cadena vacía)
      sucia: new FormControl(''),        // Control para el número de trampas sucias (inicializado con cadena vacía)
    });

    // Lista de nombres de controles que se deshabilitarán
    const controlsToDisable = [
      'warehouse',
      'createAt',
      'trampa',
      'roedor',
      'insectos',
      'sucia',
    ];

    // Deshabilitar cada uno de los controles enumerados en 'controlsToDisable'
    controlsToDisable.forEach(controlName => {
      this.nuevoConteoForm.controls[controlName].disable();
    });
  }

  resetForm() {
    // Restablecer valores del formulario
    const controls = this.nuevoConteoForm.controls;
    controls.trampa.setValue('');
    controls.roedor.setValue('');
    controls.insectos.setValue('');
    controls.sucia.setValue('');
  }

  private setFechaHoy(): void {
    // Set the current date for the 'createAt' control
    this.nuevoConteoForm.get('createAt')?.setValue(this.functions.fechaActual());

    // Retrieve the clientId from sessionStorage
    const clientId = Number.parseInt(sessionStorage.getItem('clientId') || '0');

    // Get the current month using 'functions.mesActual()'
    const currentMonth = this.functions.mesActual();

    // Call the service to retrieve reports for the given clientId and current month
    this.service.findByDate(clientId, currentMonth)
      .pipe(takeUntil(this.destroy$))
      .subscribe((all: TrampasGomosas[]) => {
        this.reports = all;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.chart) {
      this.chart.dispose();
    }
  }

  save() {
    this.service.save(this.nuevoConteoForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((all: TrampasGomosas[]) => {
        this.uiService.showSuccessMessage('Trampa ' + this.nuevoConteoForm.get('trampa')?.value, 'Registrada correctamente');
        this.resetForm();
        this.setFechaHoy();
        this.cd.detectChanges();
      });
  }

  cargarDatos() {
    let month = this.form.get('month')?.value;
    let branchId = this.form.get('branch')?.value;
    this.reports = [];
    if (month == 0) {
      this.yearly = true;
      this.service.findByYear(branchId.id, this.functions.anioActual())
        .pipe(takeUntil(this.destroy$))
        .subscribe((all: TrampasGomosas[]) => {
          this.reports = all;

          if (this.chart) {
            this.chart.dispose();
          }

          this.processDataForChart(this.reports, true);
          this.initChart();
          this.cd.detectChanges();
        });
    }
    if (month != 0) {
      this.yearly = false;
      this.service.findByDate(branchId.id, month)
        .pipe(takeUntil(this.destroy$))
        .subscribe((all: TrampasGomosas[]) => {
          this.reports = all;

          if (this.chart) {
            this.chart.dispose();
          }

          this.processDataForChart(this.reports, false);
          this.initChart();
          this.cd.detectChanges();
        });
    }
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = this.chartData;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    if (this.chartData[0] && this.chartData[0].trampa) {
      categoryAxis.dataFields.category = "trampa";
      categoryAxis.title.text = "Trampa";
    } else {
      categoryAxis.dataFields.category = "category";
      categoryAxis.title.text = "Categoría";
    }

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Cantidad";

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = categoryAxis.dataFields.category;
    series.name = "Cantidad";
    series.columns.template.tooltipText = "{categoryX}: {valueY}";
    series.columns.template.fillOpacity = 0.8;
    series.stacked = true;

    // Si es un gráfico de trampas, no necesitas cambiar colores por categoría, así que sólo aplica el adapter si es necesario
    if (!this.chartData[0].trampa) {
      series.columns.template.adapter.add("fill", (fill, target) => {
        let category = target.dataItem && (target.dataItem as am4charts.ColumnSeriesDataItem).categoryX;
        if (category == "Roedores") {
          return am4core.color("#00FAF7");
        } else if (category == "Insectos") {
          return am4core.color("#743DCA");
        } else if (category == "Sucias") {
          return am4core.color("#6CEB14");
        }
        return fill;
      });
    }

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }



  processDataForChart(data: TrampasGomosas[], isYearly: boolean) {

    if (isYearly) {
      this.processDataForYearlyChart(data);
    } else {
      let roedoresCount = 0;
      let insectosCount = 0;
      let suciasCount = 0;

      data.forEach(item => {
        if (item.roedor) roedoresCount++;
        if (item.insectos) insectosCount++;
        if (item.sucia) suciasCount++;
      });

      this.chartData = [
        {"category": "Roedores", "count": roedoresCount},
        {"category": "Insectos", "count": insectosCount},
        {"category": "Sucias", "count": suciasCount}
      ];
    }
  }

  processDataForYearlyChart(data: TrampasGomosas[]) {
    let traps: { [key: number]: number } = {};

    let s: string = this.selectedFilter;

    data.forEach(item => {
      // @ts-ignore
      if (item && item[s]/*Aqui quiero agregar el filtro*/) {
        if (!traps[item.trampa]) {
          traps[item.trampa] = 0;
        }
        traps[item.trampa]++;
      }
    });

    // Si no hay conteo de roedores en ninguna trampa, establecer el conteo a 0 para todas las trampas
    if (Object.keys(traps).length === 0) {
      data.forEach(item => {
        traps[item.trampa] = 0;
      });
    }

    this.chartData = Object.keys(traps).map(key => {
      return {"trampa": parseInt(key), "count": traps[key as any]};
    });
  }



  eliminar(r: any) {
    this.uiService.confirmDeletion()
      .then((result) => {
        if (result.isConfirmed) {
          this.service.delete(r.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(all => {
              Swal.fire({
                title: 'Eliminado',
                text: 'Se ha eliminado el registro',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.cargarDatos();
              this.cd.detectChanges();
            });
        }
        if (result.isDismissed) {
          close();
        }
      })
  }

  editar(r: any) {
    this.uiService.editDialogGomosas(r)
      .then(result => {
        if (result.isConfirmed && result.value) {
          r.roedor = result.value.roedor;
          r.insectos = result.value.insectos;
          r.sucia = result.value.sucia;
          this.service.update(r)
            .pipe(takeUntil(this.destroy$))
            .subscribe((all: TrampasGomosas[]) => {
              Swal.fire({
                title: 'Actualizado',
                text: 'Se ha actualizado correctamente',
                icon: 'success'
              })
            });
          this.cd.detectChanges();
        }
      });
  }


  private _getBranches() {
    // Fetch branches for the given clientId
    this.branchService.findByClientId(this.clientId, 1, 100)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        // Store fetched branches in 'branches' variable
        this.branches = response.content as ClientsBranchOffice[];

        // Detect changes in the Angular component
        this.cd.detectChanges();
      });

    // Subscribe to changes in the 'branchOffice' control
    this.nuevoConteoForm.get('branchOffice')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        // Detect changes in the Angular component
        this.cd.detectChanges();

        // Enable form controls related to pest counting
        const controlsToEnable = ['warehouse'];
        controlsToEnable.forEach(controlName => {
          this.nuevoConteoForm.controls[controlName].enable();
        });

        // Fetch warehouses for the selected branch office
        this._getWarehouses(value.id);
      });
  }

  private _getWarehouses(id: any = null) {
    this.wareHouseService.findByBranchId(id, 1, 100)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          this.warehouse = response.content as ClientsWarehouse[];
          this.nuevoConteoForm.controls['warehouse'].valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              value => {
                // Enable form controls related to pest counting
                const controlsToEnable = ['createAt', 'trampa', 'roedor', 'insectos', 'sucia'];
                controlsToEnable.forEach(controlName => {
                  this.nuevoConteoForm.controls[controlName].enable();
                });
                this.cd.detectChanges();
              })
          this.cd.detectChanges();
        }
      )
  }

  // Función para gestionar el almacenamiento en sessionStorage
  private manageSessionStorage(): void {
    // Obtener el 'clientId' almacenado en sessionStorage
    this.clientId = sessionStorage.getItem('clientId');

    // Obtener el 'branchId' almacenado en sessionStorage
    this.branchId = sessionStorage.getItem('branchId');

    // Eliminar el elemento 'reports' de sessionStorage si existe
    sessionStorage.removeItem('reports');
  }
}
