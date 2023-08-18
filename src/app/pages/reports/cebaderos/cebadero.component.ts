/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
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
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalCebaderoBlancoComponent} from "./modals/blanco/modal-cebadero-blanco.component";
import {ModalTodosComponent} from "./modals/todos/modal-todos.component";
import {ModalUltimoMesComponent} from "./modals/ultimo-mes/modal-ultimo-mes.component";
import {ModalSoloUnoComponent} from "./modals/solo-uno/modal-solo-uno.component";
import {catchError, throwError} from "rxjs";
import { Cebadero } from "src/app/models/cebadero";


@Component({
  selector: 'app-historial-capturas-trampas',
  templateUrl: './cebadero.component.html',
  styleUrls: ['./cebadero.component.scss'],
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
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.manageSessionStorage();
    this._initForm();
    this.findBranches();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
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
          this.cargarDatos(b.id);
          this.cd.detectChanges();
        })
      })
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

        this.cebaderos = Array.from(allCebaderosSet)
          .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

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
    })
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
    this.clientId = sessionStorage.getItem('clientId');
    this.branchId = sessionStorage.getItem('branchId');
    sessionStorage.removeItem('reports');
  }

  editCebaderoValue(month: string, day: string, cebadero: string) {
    const cebaderoValue = this.reportData[month][day][cebadero];
    const dateSelected = `${this.functions.anioActual()}-${this.functions.monthToNumber(month) + 1}-${day}`;
    console.log(dateSelected);
    if (cebaderoValue == null || cebaderoValue == undefined) {
      this.salvarSoloUno(dateSelected, Number.parseInt(cebadero));
    } else {
      this.handleCebaderoEdition(month, day, cebadero, cebaderoValue);
    }
  }

  handleCebaderoEdition(month: string, day: string, cebadero: string, cebaderoValue: any) {
    const monthNumber = this.functions.monthToNumber(month) + 1;
    const branchNumber = this.range.controls.branch.value.id;

    Swal.fire({
      title: `Editar Cebadero: ${cebadero} del dia ${day} de ${month}`,
      html: `
      <div>
        <input type="checkbox" id="cebaderoValue" ${cebaderoValue ? 'checked' : ''}> Cebadero
      </div>
    `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          cebaderoValue: (document.getElementById('cebaderoValue') as HTMLInputElement).checked
        }
      }
    }).then(result => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Si el botón cancelar fue presionado, simplemente regresa sin hacer nada
        return;
      }
      if (result.isConfirmed) {
        this.updateCebadero(branchNumber, monthNumber, day, cebadero, result.value?.cebaderoValue);
      }

      // @ts-ignore
      this.reportData[month][day][cebadero] = result.value?.cebaderoValue;
      this.cd.detectChanges();
    });
  }

  updateCebadero(branchNumber: number, monthNumber: number, day: string, cebadero: string, newValue: any) {
    this.service.findByBranchYearMonthDayCebadero(branchNumber, this.functions.anioActual(), monthNumber,
      Number.parseInt(day), Number.parseInt(cebadero))
      .pipe(
        catchError(error => {
          // Aquí manejas el error, por ejemplo, mostrando un mensaje al usuario
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al actualizar el cebadero.',
          });
          return throwError(error);
        })
      )
      .subscribe(data => {
        data[0].consumo = newValue;
        if (data[0]) {
          this.service.updateCebadero(data[0]).subscribe(c => {
            const booleanValue = c.consumo ? 'Si Consumió' : 'No consumió';
            Swal.fire({
              icon: 'success',
              title: `Actualizado`,
              text: `Cebadero ${c.cebadero} actualizado con exito a ${booleanValue}`,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          })
        }
      })
  }


  salvarBlanco() {
    const modalRef = this.modalService.open(ModalCebaderoBlancoComponent, {size: 'xl'});
    modalRef.componentInstance.name = 'Nuevo Registro de Cebadero';

    //
    modalRef.result.then((result) => {
    }).catch((reason) => {
    });
  }

  salvarTodos() {
    const modalRef = this.modalService.open(ModalTodosComponent, {size: 'xl'});
    modalRef.componentInstance.name = 'Nuevo Registro de Cebadero';

    //
    modalRef.result.then((result) => {
    }).catch((reason) => {
    });
  }

  salvarUltimoMes() {
    const modalRef = this.modalService.open(ModalUltimoMesComponent, {size: 'xl'});
    modalRef.componentInstance.name = 'Cebaderos registrados el último mes';

    //
    modalRef.result.then((result) => {
    }).catch((reason) => {
    });
  }

  handleCebaderoCreated(cebadero: Cebadero) {
    console.log('Cebadero creado:', cebadero);
    this.cargarDatos(this.range.controls.branch.value.id);
  }

  salvarSoloUno(dateSelected?: String, cebadero?: number) {
    const modalRef = this.modalService.open(ModalSoloUnoComponent, {size: 'xl'});
    modalRef.componentInstance.name = 'Solo un Cebadero';
    modalRef.componentInstance.date = dateSelected;
    modalRef.componentInstance.cebadero = cebadero;

    modalRef.componentInstance.cebaderoCreated.subscribe((newCebadero: Cebadero) => {
      this.handleCebaderoCreated(newCebadero);
    });

    //
    modalRef.result.then((result) => {
    }).catch((reason) => {
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

  nuevoIncidente() {
    Swal.fire({
      title: 'Generar Nuevo Incidente',
      text: 'Elige una opción para crear el reporte:',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      input: 'radio',
      inputOptions: {
        'ultimoMes': 'Último mes registrado',
        'blanco': 'Reporte en blanco',
        'todosCebaderos': 'Todos los cebaderos',
        'unCebadero': 'Solo un cebadero'
      },
      customClass: {
        container: 'my-swal-class' // Esto añade una clase personalizada al contenedor del cuadro de diálogo
      },
      inputValue: 'ultimoMes', // Esto define la opción predeterminada
      showLoaderOnConfirm: true,
      preConfirm: (value): Promise<void> => {
        return new Promise<void>((resolve) => {

          if (value === 'ultimoMes') {
            this.salvarUltimoMes();
            this.cd.detectChanges();

          } else if (value === 'blanco') {
            this.salvarBlanco();
            this.cd.detectChanges();

          } else if (value === 'todosCebaderos') {
            this.salvarTodos();
            this.cd.detectChanges();

          } else if (value === 'unCebadero') {
            this.salvarSoloUno();
            this.cd.detectChanges();
          }
          resolve();
        });
      }
    })
  }
}
