/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {Component, Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {Cebadero} from "../../../../../models/cebadero";
import {ClientsBranchOffice} from "../../../../../models/clients-branch-office";
import {ClientsWarehouse} from "../../../../../models/clients-warehouse";

@Component({
  selector: 'app-ultimo-mes',
  templateUrl: './modal-ultimo-mes.component.html',
  styleUrls: ['./modal-ultimo-mes.component.scss']
}) export class ModalUltimoMesComponent {

  nuevoCebaderoForm: FormGroup;

  nuevoCebadero: Cebadero;
  branches: ClientsBranchOffice;
  warehouse: ClientsWarehouse;


  // @ts-ignore
  @Input() name;
  constructor(public activeModal: NgbActiveModal){}

  initForm() {
    this.nuevoCebaderoForm = new FormGroup({

    });
  }
}
