import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {DropdownMenusModule, WidgetsModule} from '../../_metronic/partials';
import {TranslationModule} from "../../modules/i18n";
import {InlineSVGModule} from "ng-inline-svg";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BranchComponent} from "./branch.component";

@NgModule({
  declarations: [BranchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BranchComponent,
      },
    ]),
    WidgetsModule,
    TranslationModule,
    DropdownMenusModule,
    InlineSVGModule,
    MatPaginatorModule,
  ],
})
export class BranchModule {}
