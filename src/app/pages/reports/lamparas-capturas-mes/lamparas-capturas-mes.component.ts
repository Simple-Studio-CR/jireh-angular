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
import * as am5 from "@amcharts/amcharts5";


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
    this._iniciarForms();
    this.nuevoConteoForm.controls['warehouse'].disable();
    this.setFechaHoy();
    this.clientId = sessionStorage.getItem('clientId');
    this.branchId = sessionStorage.getItem('branchId');
    this._getBranches();
  }

  _iniciarForms() {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
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
    this.range.get('start')?.setValue(this.functions.primerDiaMes());
    this.range.get('end')?.setValue(this.functions.ultimoDiaMes());

    // @ts-ignore
    this.service.findByDateRange(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')),
      this.functions.primerDiaMes(),
      this.functions.ultimoDiaMes()).subscribe(all => {
      this.reports = all as LamparasCapturasMes[];
      console.log(this.reports)
      this.cd.detectChanges();
    })
  }

  save() {
    this.service.save(this.nuevoConteoForm.value).subscribe(
      response => {
        this.nuevoConteoForm.controls['trampa'].setValue('');
        this.nuevoConteoForm.controls['moscas'].setValue('');
        this.nuevoConteoForm.controls['palomillas'].setValue('');
        this.nuevoConteoForm.controls['otros'].setValue('');
        this.nuevoConteoForm.controls['total'].setValue('');
      }
    );
    this.setFechaHoy();
  }

  private _getBranches() {

    this.range.valueChanges.subscribe(date => {
      this.nuevoConteo = [];
      if (date.end == null) {
        // @ts-ignore
        this.service.findByDate(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), date.start).subscribe(all => {
          this.nuevoConteo = all as LamparasCapturasMes[];
          this.cd.detectChanges();
        })
      }
      if (date.end != null && date.start != null) {
        // @ts-ignore
        this.service.findByDateRange(Number.parseInt(this.clientId = sessionStorage.getItem('clientId')), date.start, date.end).subscribe(all => {
          this.nuevoConteo = all as LamparasCapturasMes[];
          this.cd.detectChanges();
        })
      }
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
}
