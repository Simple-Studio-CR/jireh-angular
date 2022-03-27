import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {DropdownMenusModule, WidgetsModule} from '../../_metronic/partials';
import {IssuingComponent} from "./issuing.component";
import {TranslationModule} from "../../modules/i18n";
import {InlineSVGModule} from "ng-inline-svg";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [IssuingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IssuingComponent,
      },
    ]),
    WidgetsModule,
    TranslationModule,
    DropdownMenusModule,
    InlineSVGModule,
    MatPaginatorModule,
  ],
})
export class IssuingModule {}
