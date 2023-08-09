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

  displayedColumns: string[] = ['trampa', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
    'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
  dataSource = new MatTableDataSource(REPORTE_DATA);

  range: FormGroup;

  // Arreglo para almacenar información sobre las sucursales del cliente
  branches: ClientsBranchOffice[];

  clientId: any;

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

}
