/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {LamparasCapturasMes} from "../../../models/lamparas-capturas-mes";
import {FormControl, FormGroup} from "@angular/forms";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../models/clients-warehouse";
import {LamparasCapturasMesService} from "../../../services/lamparas-capturas-mes.service";
import {ClientsService} from "../../../services/clients.service";
import {ExtrasService} from "../../../services/extras.service";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {ClientsWarehouseService} from "../../../services/clients-warehouse.service";
import {MatInputModule} from "@angular/material/input";
import {FunctionsService} from "../../common/functions.service";
import swal from "sweetalert2";


@Component({
  selector: 'app-lamparas-capturas-mes',
  templateUrl: './lamparas-capturas-mes.component.html',
  styleUrls: ['./lamparas-capturas-mes.component.scss']
})
export class LamparasCapturasMesComponent implements OnInit {

  // Declaraciones de variables

// Variable para almacenar el ID del cliente
  clientId: any;

// Variable para almacenar el ID de la sucursal
  branchId: any;

// Arreglo para almacenar información sobre las sucursales del cliente
  branches: ClientsBranchOffice[];

// Arreglo para almacenar información sobre los almacenes del cliente
  warehouse: ClientsWarehouse[];

// Arreglo para almacenar información sobre un nuevo conteo de lámparas capturadas por mes
  nuevoConteo: LamparasCapturasMes[];

// FormGroup para manejar los controles del formulario de nuevo conteo
  nuevoConteoForm: FormGroup;

// FormGroup para manejar los controles de un rango de fechas
  form: FormGroup;

// Instancia del servicio 'FunctionsService' para funciones auxiliares
  functions: FunctionsService = new FunctionsService();

// Arreglo para almacenar información sobre los reportes de lámparas capturadas por mes
  reports: LamparasCapturasMes[];


  constructor(
    private service: LamparasCapturasMesService,
    private clientService: ClientsService,
    private pestTypeService: ExtrasService,
    private branchService: ClientsBranchesService,
    private wareHouseService: ClientsWarehouseService,
    private matInput: MatInputModule,
    private cd: ChangeDetectorRef,
  ) {
  }


  // Método del ciclo de vida que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Gestionar el almacenamiento en sessionStorage
    this.manageSessionStorage();

    // Inicializar los formularios y controles
    this.initializeForms();

    // Obtener y configurar la información de las sucursales y almacenes
    this._getBranches();
  }


  // Función para inicializar los formularios y sus controles
  private initializeForms(): void {
    // Crear un FormGroup llamado 'range' para manejar un rango de fechas
    this.form = new FormGroup({
      branch: new FormControl<Date | null>(null), // Control para la fecha de inicio (puede ser nulo)
      month: new FormControl<Date | null>(null), // Control para la fecha de inicio (puede ser nulo)
    });

    // Crear un FormGroup llamado 'nuevoConteoForm' para manejar el formulario de conteo de plagas
    this.nuevoConteoForm = new FormGroup({
      branchOffice: new FormControl(''), // Control para la sucursal (inicializado con cadena vacía)
      createAt: new FormControl(''),     // Control para la fecha de creación (inicializado con cadena vacía)
      warehouse: new FormControl(''),    // Control para el almacén (inicializado con cadena vacía)
      trampa: new FormControl(''),       // Control para el número de trampas (inicializado con cadena vacía)
      moscas: new FormControl(''),       // Control para el número de moscas (inicializado con cadena vacía)
      palomillas: new FormControl(''),   // Control para el número de polillas (inicializado con cadena vacía)
      otros: new FormControl(''),        // Control para otras plagas (inicializado con cadena vacía)
      total: new FormControl(''),        // Control para el total de plagas (inicializado con cadena vacía)
    });

    // Lista de nombres de controles que se deshabilitarán
    const controlsToDisable = [
      'warehouse',
      'createAt',
      'trampa',
      'moscas',
      'palomillas',
      'otros',
      'total',
    ];

    // Deshabilitar cada uno de los controles enumerados en 'controlsToDisable'
    controlsToDisable.forEach(controlName => {
      this.nuevoConteoForm.controls[controlName].disable();
    });
  }


  // Función para realizar cálculos basados en cambios en los valores de los controles
  calcular(): void {
    // Definir una función para actualizar el valor del control 'total'
    const updateTotal = () => {
      // Obtener los valores de los controles 'moscas', 'palomillas' y 'otros'
      const moscasValue = this.nuevoConteoForm.controls['moscas'].value || 0;
      const palomillasValue = this.nuevoConteoForm.controls['palomillas'].value || 0;
      const otrosValue = this.nuevoConteoForm.controls['otros'].value || 0;

      // Calcular la suma de los valores obtenidos
      const totalValue = moscasValue + palomillasValue + otrosValue;

      // Establecer el valor calculado en el control 'total'
      this.nuevoConteoForm.controls['total'].setValue(totalValue);
    };

    // Suscribirse a cambios en el control 'moscas' y llamar a la función 'updateTotal'
    this.nuevoConteoForm.controls['moscas'].valueChanges.subscribe(updateTotal);

    // Suscribirse a cambios en el control 'palomillas' y llamar a la función 'updateTotal'
    this.nuevoConteoForm.controls['palomillas'].valueChanges.subscribe(updateTotal);

    // Suscribirse a cambios en el control 'otros' y llamar a la función 'updateTotal'
    this.nuevoConteoForm.controls['otros'].valueChanges.subscribe(updateTotal);
  }


  private setFechaHoy(): void {
    // Set the current date for the 'createAt' control
    this.nuevoConteoForm.get('createAt')?.setValue(this.functions.fechaActual());

    // Retrieve the clientId from sessionStorage
    const clientId = Number.parseInt(sessionStorage.getItem('clientId') || '0');

    // Get the current month using 'functions.mesActual()'
    const currentMonth = this.functions.mesActual();

    // Call the service to retrieve reports for the given clientId and current month
    this.service.findByDate(clientId, currentMonth).subscribe((all: LamparasCapturasMes[]) => {
      this.reports = all;
      this.cd.detectChanges();
    });
  }


  // Función para guardar el formulario y analizar meses pasados
  save() {
    const formData = this.nuevoConteoForm.value;
    const totalMonths = this.functions.mesActual();
    const clientId = Number.parseInt(sessionStorage.getItem('clientId') || '0');

    // Obtener datos de trampas por mes
    this.analyzeAndSaveTrapsByMonth(1, totalMonths - 1, clientId, formData.trampa, formData.branchOffice, formData.warehouse);

    // Guardar el nuevoConteoForm
    this.service.save(formData).subscribe(response => {
      swal.fire({
        title: 'Nuevo conteo en la trampa' + ` ${response.trampa}`,
        text: 'El conteo de plagas se ha guardado correctamente con un total de ' + `${response.total}` + ' insectos',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetForm();
          this.setFechaHoy();
        }
      })
    });
  }

// Función para analizar y guardar trampas por mes
  analyzeAndSaveTrapsByMonth(createAt1: number, createAt2: number, clientId: number, trap: number,
                             branch: ClientsBranchOffice, warehouse: ClientsWarehouse) {
    this.service.findVerificandoExistencia(createAt1, createAt2, clientId, trap).subscribe(response => {
      let nuevoObjeto: any[] = [];
      let mesAnalizado = 0;

      if (response == null) {
        // Crear objetos con parámetros en 0 para los meses sin registros
        for (let i = 0; i < createAt2; i++) {
          nuevoObjeto = [{
            createAt: this.functions.anioActual() + '-' + (i + 1) + '-01',
            branchOffice: branch,
            warehouse: warehouse,
            trampa: trap,
            moscas: 0,
            palomillas: 0,
            otros: 0,
            total: 0,
          }];

          // Guardar el objeto en la base de datos
          this.service.save(nuevoObjeto[0]).subscribe(() => {
            this.cd.detectChanges();
          });
        }
      }

      if (response != null) {
        // Analizar meses con registros y crear objetos para meses faltantes
        for (let i = 0; i < response.length; i++) {
          let mes = response[i].createAt.split('-');
          if (Number.parseInt(mes[1]) == i + 1) {
            mesAnalizado++;
          } else {
            mesAnalizado++;
          }

          if (i == response.length - 1 && mesAnalizado < createAt2) {
            // Crear objetos para los meses restantes sin registros
            for (let j = mesAnalizado; j < createAt2; j++) {
              nuevoObjeto = [{
                createAt: this.functions.anioActual() + '-' + (mesAnalizado + 1) + '-01',
                branchOffice: branch,
                warehouse: warehouse,
                trampa: trap,
                moscas: 0,
                palomillas: 0,
                otros: 0,
                total: 0,
              }];

              // Guardar el objeto en la base de datos
              this.service.save(nuevoObjeto[0]).subscribe(() => {
                this.cd.detectChanges();
              });

              mesAnalizado++;
            }
          }
        }
      }
    });
  }


  resetForm() {
    // Restablecer valores del formulario
    const controls = this.nuevoConteoForm.controls;
    controls.trampa.setValue('');
    controls.moscas.setValue('');
    controls.palomillas.setValue('');
    controls.otros.setValue('');
    controls.total.setValue('');
  }

  private _getBranches(): void {
    // Fetch branches for the given clientId
    this.branchService.findByClientId(this.clientId, 1, 100).subscribe((response: any) => {
      // Store fetched branches in 'branches' variable
      this.branches = response.content as ClientsBranchOffice[];

      // Detect changes in the Angular component
      this.cd.detectChanges();
    });

    // Subscribe to changes in the 'branchOffice' control
    this.nuevoConteoForm.get('branchOffice')?.valueChanges.subscribe((value: any) => {
      // Detect changes in the Angular component
      this.cd.detectChanges();

      // Enable form controls related to pest counting
      const controlsToEnable = ['warehouse', 'createAt', 'trampa', 'moscas', 'palomillas', 'otros', 'total'];
      controlsToEnable.forEach(controlName => {
        this.nuevoConteoForm.controls[controlName].enable();
      });

      // Fetch warehouses for the selected branch office
      this._getWarehouses(value.id);
    });
  }


  private _getWarehouses(id: any = null) {
    this.wareHouseService.findByBranchId(id, 1, 100).subscribe(
      response => {
        this.warehouse = response.content as ClientsWarehouse[];
        this.cd.detectChanges();
      }
    )
  }

  eliminar(id: any) {

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

  cargarDatos() {
    let month = this.form.get('month')?.value;
    let branchId = this.form.get('branch')?.value;
    this.reports = [];
    sessionStorage.removeItem('reports')
    if(month == 0){
      this.service.findByYear(branchId.id, this.functions.anioActual()).subscribe((all: LamparasCapturasMes[]) => {
        // Store fetched reports in 'reports' variable
        this.reports = all;
        // Store 'reports' in sessionStorage
        sessionStorage.setItem('reports', JSON.stringify(this.reports));
        this.cd.detectChanges();
      });
    }
    if(month != 0){
      this.service.findByDate(branchId.id, month).subscribe((all: LamparasCapturasMes[]) => {
        // Store fetched reports in 'reports' variable
        this.reports = all;
        // Store 'reports' in sessionStorage
        sessionStorage.setItem('reports', JSON.stringify(this.reports));
        this.cd.detectChanges();
      });
    }
  }

  editar(r: any) {

  }
}
