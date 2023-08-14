/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSort, Sort } from "@angular/material/sort";
import {CebaderosService} from "../../../services/cebadero.service";
import {ClientsBranchesService} from "../../../services/clients-branches.service";
import {ClientsWarehouseService} from "../../../services/clients-warehouse.service";
import {Router} from "@angular/router";
import {UiService} from "../../../services/ui.service";
import {takeUntil} from "rxjs/operators";
import {ClientsBranchOffice} from "../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../models/clients-warehouse";
import {FunctionsService} from "../../common/functions.service";


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

  constructor(
    private service: CebaderosService,
    private branchService: ClientsBranchesService,
    private wareHouseService: ClientsWarehouseService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private uiService: UiService,
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.manageSessionStorage();
    this.cargarDatos();
  }

  ngOnDestroy() {}

  ngAfterViewInit() {}

  private cargarDatos() {
    //todo colocar bien el branchId
    this.service.getDetailedReport(15, this.functions.anioActual()).subscribe( data => {
      console.log(data);
    });
  }

  private manageSessionStorage(): void {
    // Obtener el 'clientId' almacenado en sessionStorage
    this.clientId = sessionStorage.getItem('clientId');

    // Obtener el 'branchId' almacenado en sessionStorage
    this.branchId = sessionStorage.getItem('branchId');

    // Eliminar el elemento 'reports' de sessionStorage si existe
    sessionStorage.removeItem('reports');
  }

}
