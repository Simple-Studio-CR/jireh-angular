/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {LamparasCapturasMesService} from "../../../services/lamparas-capturas-mes.service";
import {HitorialAnualModel} from "./hitorial-anual.model";
import {empty} from "object-path";

@Component({
  selector: 'app-historial-capturas-lamparas',
  templateUrl: './historial-capturas-lamparas.component.html',
  styleUrls: ['./historial-capturas-lamparas.component.scss']
})
export class HistorialCapturasLamparasComponent implements OnInit {

  range: FormGroup;
  historial: HitorialAnualModel[];
  hitorialAnual: any;

  totalBichosEnero: number = 0;
  totalBichosFebrero: number = 0;
  totalBichosMarzo: number = 0;
  totalBichosAbril: number = 0;
  totalBichosMayo: number = 0;
  totalBichosJunio: number = 0;
  totalBichosJulio: number = 0;
  totalBichosAgosto: number = 0;
  totalBichosSetiembre: number = 0;
  totalBichosOctubre: number = 0;
  totalBichosNoviembre: number = 0;
  totalBichosDiciembre: number = 0;

  constructor(private service: LamparasCapturasMesService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.cargarDatos();
    this._initForm();
  }

  _initForm() {
    this.range = new FormGroup({
      branch: new FormControl(),
      warehouse: new FormControl()
    });
  }

  cargarDatos() {
    let date = new Date();

    let enero: any = [];
    let febrero: any = [];
    let marzo: any = [];
    let abril: any = [];
    let mayo: any = [];
    let junio: any = [];
    let julio: any = [];
    let agosto: any = [];
    let setiembre: any = [];
    let octubre: any = [];
    let noviembre: any = [];
    let diciembre: any = [];

    this.hitorialAnual = [{
      'enero': enero,
      'febrero': febrero,
      'marzo': marzo,
      'abril': abril,
      'mayo': mayo,
      'junio': junio,
      'julio': julio,
      'agosto': agosto,
      'setiembre': setiembre,
      'octubre': octubre,
      'noviembre': noviembre,
      'diciembre': diciembre,
    }]

    this.service.findReporteAnual(date.getFullYear(), sessionStorage.getItem('clientId')).subscribe(data => {
        console.log(data, 'data');

        for (let i = 0; i < data.length; i++) {

          if (data[i][3] == 1) {
            this.totalBichosEnero = this.totalBichosEnero + data[i][0];
            this.cargarTabla(enero, data[i][0], data[i][2]);
          }
          if (data[i][3] == 2) {
            this.totalBichosFebrero = this.totalBichosFebrero + data[i][0];
            this.cargarTabla(febrero, data[i][0], data[i][2]);
          }
          if (data[i][3] == 3) {
            this.totalBichosMarzo = this.totalBichosMarzo + data[i][0];
            this.cargarTabla(marzo, data[i][0], data[i][2]);
          }
          if (data[i][3] == 4) {
            this.totalBichosAbril = this.totalBichosAbril + data[i][0];
            this.cargarTabla(abril, data[i][0], data[i][2]);
          }
          if (data[i][3] == 5) {
            this.totalBichosMayo = this.totalBichosMayo + data[i][0];
            this.cargarTabla(mayo, data[i][0], data[i][2]);
          }
          if (data[i][3] == 6) {
            this.totalBichosJunio = this.totalBichosJunio + data[i][0];
            this.cargarTabla(junio, data[i][0], data[i][2]);
          }
          if (data[i][3] == 7) {
            this.totalBichosJulio = this.totalBichosJulio + data[i][0];
            this.cargarTabla(julio, data[i][0], data[i][2]);
          }
          if (data[i][3] == 8) {
            this.totalBichosAgosto = this.totalBichosAgosto + data[i][0];
            this.cargarTabla(agosto, data[i][0], data[i][2]);
          }
          if (data[i][3] == 9) {
            this.totalBichosSetiembre = this.totalBichosSetiembre + data[i][0];
            this.cargarTabla(setiembre, data[i][0], data[i][2]);
          }
          if (data[i][3] == 10) {
            this.totalBichosOctubre = this.totalBichosOctubre + data[i][0];
            this.cargarTabla(octubre, data[i][0], data[i][2]);
          }
          if (data[i][3] == 11) {
            this.totalBichosNoviembre = this.totalBichosNoviembre + data[i][0];
            this.cargarTabla(noviembre, data[i][0], data[i][2]);
          }
          if (data[i][3] == 12) {
            this.totalBichosDiciembre = this.totalBichosDiciembre + data[i][0];
            this.cargarTabla(diciembre, data[i][0], data[i][2]);
          }
        }

        console.log(this.hitorialAnual, 'historial anual');
      let size = 0;
      let trampa = 0;
        for (let i = 1; i <= 12; i++) {
          if(this.hitorialAnual[0][this._getMesString('',i)].length > 0) {
            if(size < this.hitorialAnual[0][this._getMesString('',i)].length) {
              size = this.hitorialAnual[0][this._getMesString('', i)].length;
              console.log(size, 'size en el if', i);
            }
          }
        }
        console.log(size, 'size final');
        for(let i = 1; i <= 12; i++) {
          if(this.hitorialAnual[0][this._getMesString('',i)].length < size) {
            let diff = size - this.hitorialAnual[0][this._getMesString('',i)].length;
            for(let j = 0; j < diff; j++){
              this.hitorialAnual[0][this._getMesString('',i)].splice(j, 0, {
                'numeroCapturas': 0,
                'trampa': 0,
              })
            }
          }
        }
        this.cd.detectChanges();
      });
  }

  cargarTabla(mes: any, total: any, trampa: any): any {
    return mes.splice(0, 0, {
      'numeroCapturas': total,
      'trampa': trampa,
    })
  }

  eliminar(id: any) {}

  _getMesString(mesString: string, mes: number):
    string {
    switch (mes) {
      case 1:
        mesString = 'enero';
        break;
      case 2:
        mesString = 'febrero';
        break;
      case 3:
        mesString = 'marzo';
        break;
      case 4:
        mesString = 'abril';
        break;
      case 5:
        mesString = 'mayo';
        break;
      case 6:
        mesString = 'junio';
        break;
      case 7:
        mesString = 'julio';
        break;
      case 8:
        mesString = 'agosto';
        break;
      case 9:
        mesString = 'setiembre';
        break;
      case 10:
        mesString = 'octubre';
        break;
      case 11:
        mesString = 'noviembre';
        break;
      case 12:
        mesString = 'diciembre';
        break;
    }
    return mesString;
  }
}
