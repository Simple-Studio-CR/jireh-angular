/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {LamparasCapturasMes} from "../../../models/lamparas-capturas-mes";

@Component({
  selector: 'app-historial-capturas-lamparas',
  templateUrl: './historial-capturas-lamparas.component.html',
  styleUrls: ['./historial-capturas-lamparas.component.scss']
})
export class HistorialCapturasLamparasComponent implements OnInit {

  range: FormGroup;
  reports: LamparasCapturasMes[];

  constructor() {
  }

  ngOnInit() {
  }

  _initForm() {
    this.range = new FormGroup({
      branch: new FormControl(),
      warehouse: new FormControl()
    });
  }

  eliminar(id: any) {

  }
}
