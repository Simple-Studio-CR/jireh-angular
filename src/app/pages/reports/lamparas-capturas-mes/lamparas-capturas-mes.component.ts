/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, Inject, NgZone, OnInit, PLATFORM_ID} from "@angular/core";
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


@Component({
  selector: 'app-lamparas-capturas-mes',
  templateUrl: './lamparas-capturas-mes.component.html',
  styleUrls: ['./lamparas-capturas-mes.component.scss']
})
export class LamparasCapturasMesComponent implements OnInit {

  clientId: any;
  branchId: any;
  branches: ClientsBranchOffice[];
  warehouse: ClientsWarehouse[];
  nuevoConteo: LamparasCapturasMes[];
  nuevoConteoForm: FormGroup;
  range: FormGroup;
  functions: FunctionsService = new FunctionsService();
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


  ngOnInit(): void {
    this.sessionStorage();
    this._iniciarForms();
    this.setFechaHoy();
    this._getBranches();
  }

  _iniciarForms() {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
    });

    this.nuevoConteoForm = new FormGroup({
      branchOffice: new FormControl(''),
      createAt: new FormControl(''),
      warehouse: new FormControl(''),
      trampa: new FormControl(''),
      moscas: new FormControl(''),
      palomillas: new FormControl(''),
      otros: new FormControl(''),
      total: new FormControl(''),
    })

    this.nuevoConteoForm.controls['warehouse'].disable();
    this.nuevoConteoForm.controls['createAt'].disable();
    this.nuevoConteoForm.controls['trampa'].disable();
    this.nuevoConteoForm.controls['moscas'].disable();
    this.nuevoConteoForm.controls['palomillas'].disable();
    this.nuevoConteoForm.controls['otros'].disable();
    this.nuevoConteoForm.controls['total'].disable();
  }

  calcular(): any {
    this.nuevoConteoForm.controls['moscas'].valueChanges.subscribe(
      value => {
        value = value + this.nuevoConteoForm.controls['palomillas'].value + this.nuevoConteoForm.controls['otros'].value;
        this.nuevoConteoForm.controls['total'].setValue(value);
      });

    this.nuevoConteoForm.controls['palomillas'].valueChanges.subscribe(
      value => {
        value = value + this.nuevoConteoForm.controls['moscas'].value + this.nuevoConteoForm.controls['otros'].value;
        this.nuevoConteoForm.controls['total'].setValue(value);
      });

    this.nuevoConteoForm.controls['otros'].valueChanges.subscribe(
      value => {
        value = value + this.nuevoConteoForm.controls['moscas'].value + this.nuevoConteoForm.controls['palomillas'].value;
        this.nuevoConteoForm.controls['total'].setValue(value);
      });
  }

  private setFechaHoy() {
    this.nuevoConteoForm.get('createAt')?.setValue(this.functions.fechaActual());

    // @ts-ignore
    this.service.findByDate(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')),
      this.functions.mesActual()).subscribe(all => {
      this.reports = all as LamparasCapturasMes[];
      this.cd.detectChanges();
    })
  }

  save() {
    const formData = this.nuevoConteoForm.value;

    // Guardar el nuevoConteoForm
    console.log(formData, 'form');
    this.service.save(formData).subscribe(response => {
      this.resetForm();

      console.log(response);

      const totalMonths = this.functions.mesActual();

      // Iterar sobre los meses anteriores
      for (let i = 1; i < totalMonths; i++) {
        console.log('Entramos al for con i:', i);

        // Buscar datos por mes y sucursal
        this.service.findByDate(response.branchOffice.clientId.id, i).subscribe(data => {
          console.log('Buscamos todos los datos por meses en el mes:', i);

          if (data.length === 0) {
            // Crear nuevo objeto si no existe en el mes
            const nuevo = {
              branchOffice: response.branchOffice,
              createAt: `${this.functions.anioActual()}-${i}-01`,
              warehouse: response.warehouse,
              trampa: response.trampa,
              moscas: 0,
              palomillas: 0,
              otros: 0,
              total: 0,
            };

            console.log(nuevo, 'nuevo');
            this.service.save(nuevo).subscribe(newObject => {
              console.log(newObject, 'aquí se crea en el mes', i);
              this.cd.detectChanges();
            });
          }
        });
      }
    });

    this.setFechaHoy();
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

  private _getBranches() {

    this.range.valueChanges.subscribe(date => {
      this.nuevoConteo = [];
      // @ts-ignore
      this.service.findByDate(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')),
        date.start).subscribe(all => {
        this.reports = all as LamparasCapturasMes[];

        sessionStorage.setItem('reports', JSON.stringify(this.reports));

        this.cd.detectChanges();
      });
    })

    this.branchService.findByClientId(this.clientId, 1, 100).subscribe(
      response => {
        this.branches = response.content as ClientsBranchOffice[];
        this.cd.detectChanges();
      }
    );
    this.nuevoConteoForm.get('branchOffice')?.valueChanges.subscribe(
      value => {
        this.cd.detectChanges();
        this.nuevoConteoForm.controls['warehouse'].enable();
        this.nuevoConteoForm.controls['createAt'].enable();
        this.nuevoConteoForm.controls['trampa'].enable();
        this.nuevoConteoForm.controls['moscas'].enable();
        this.nuevoConteoForm.controls['palomillas'].enable();
        this.nuevoConteoForm.controls['otros'].enable();
        this.nuevoConteoForm.controls['total'].enable();
        this._getWarehouses(value.id);
      });
  }

  private _getWarehouses(id: any = null) {
    this.wareHouseService.findByBranchId(id, 1, 100).subscribe(
      response => {
        this.warehouse = response.content as ClientsWarehouse[];
        console.log(this.warehouse);
        this.cd.detectChanges();
      }
    )
  }

  eliminar(id: any) {

  }

  private sessionStorage() {
    this.clientId = sessionStorage.getItem('clientId');
    this.branchId = sessionStorage.getItem('branchId');
    sessionStorage.removeItem('reports');
  }
}
