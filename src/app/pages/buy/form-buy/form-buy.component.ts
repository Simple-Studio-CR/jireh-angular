import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-buy',
  templateUrl: './form-buy.component.html',
  styleUrls: ['./form-buy.component.scss']
})
export class FormBuyComponent implements OnInit {
  providerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {

  }
}
