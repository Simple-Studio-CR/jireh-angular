import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import {DropdownMenusModule, WidgetsModule} from '../../_metronic/partials';
import {TranslationModule} from "../../modules/i18n";
import {BuysComponent} from "./buys.component";
import { FormBuyComponent } from './form-buy/form-buy.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [BuysComponent, FormBuyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuysComponent,
      },
      {
        path: 'view',
        component: FormBuyComponent,
      },
    ]),
    WidgetsModule,
    TranslationModule,
    MatPaginatorModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    DatePipe,
  ]
})
export class BuysModule {}
