/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../models/clients-warehouse";
import {FormControl, FormGroup} from "@angular/forms";
import {FunctionsService} from "../../common/functions.service";
import {TrampasGomosas} from "../../../models/trampas-gomosas";
import {Router} from "@angular/router";
import {TrampasGomosasService} from "../../../services/trampas-gomosas.service";

@Component({
  selector: 'app-trampas-gomosas',
  templateUrl: './trampas-gomosas.component.html',
  styleUrls: ['./trampas-gomosas.component.scss']
})
export class TrampasGomosasComponent implements OnInit{

  clientId: any;

// Variable para almacenar el ID de la sucursal
  branchId: any;

// Arreglo para almacenar información sobre las sucursales del cliente
  branches: ClientsBranchOffice[];

// Arreglo para almacenar información sobre los almacenes del cliente
  warehouse: ClientsWarehouse[];

// Arreglo para almacenar información sobre un nuevo conteo de trampas gomosas por mes
  nuevoConteo: TrampasGomosas[];

// FormGroup para manejar los controles del formulario de nuevo conteo
  nuevoConteoForm: FormGroup;

// FormGroup para manejar los controles de un rango de fechas
  range: FormGroup;

// Instancia del servicio 'FunctionsService' para funciones auxiliares
  functions: FunctionsService = new FunctionsService();

// Arreglo para almacenar información sobre los reportes de trampas gomosas por mes
  reports: TrampasGomosas[];

  constructor(

    private service: TrampasGomosasService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
  }
  ngOnInit(): void {
  }

  private initializeForms(): void {
    // Crear un FormGroup llamado 'range' para manejar un rango de fechas
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null), // Control para la fecha de inicio (puede ser nulo)
    });

    // Crear un FormGroup llamado 'nuevoConteoForm' para manejar el formulario de conteo de plagas
    this.nuevoConteoForm = new FormGroup({
      branchOffice: new FormControl(''), // Control para la sucursal (inicializado con cadena vacía)
      createAt: new FormControl(''),     // Control para la fecha de creación (inicializado con cadena vacía)
      warehouse: new FormControl(''),    // Control para el almacén (inicializado con cadena vacía)
      trampa: new FormControl(''),       // Control para el número de trampas (inicializado con cadena vacía)
      roedores: new FormControl(''),     // Control para roedores (inicializado con cadena vacía)
      insectos: new FormControl(''),     // Control para insectos (inicializado con cadena vacía)
      sucia: new FormControl(''),        // Control para sucia (inicializado con cadena vacía)
    });

    // Lista de nombres de controles que se deshabilitarán
    const controlsToDisable = [
      'warehouse',
      'createAt',
      'trampa',
      'roedores',
      'insectos',
      'sucia',
    ];

    // Deshabilitar cada uno de los controles enumerados en 'controlsToDisable'
    controlsToDisable.forEach(controlName => {
      this.nuevoConteoForm.controls[controlName].disable();
    });
  }

  private setFechaHoy(): void {
    // Set the current date for the 'createAt' control
    this.nuevoConteoForm.get('createAt')?.setValue(this.functions.fechaActual());

    // Retrieve the clientId from sessionStorage
    const clientId = Number.parseInt(sessionStorage.getItem('clientId') || '0');

    // Get the current month using 'functions.mesActual()'
    const currentMonth = this.functions.mesActual();

    // Call the service to retrieve reports for the given clientId and current month
    this.service.findByDate(clientId, currentMonth).subscribe((all: TrampasGomosas[]) => {
      this.reports = all;
      this.cd.detectChanges();
    });
  }

}
