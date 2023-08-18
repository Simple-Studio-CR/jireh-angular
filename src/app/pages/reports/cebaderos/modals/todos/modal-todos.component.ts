/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {Component, Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-todos',
  templateUrl: './modal-todos.component.html',
  styleUrls: ['./modal-todos.component.scss']
}) export class ModalTodosComponent {

  // @ts-ignore
  @Input() name;
  constructor(public activeModal: NgbActiveModal){}

}
