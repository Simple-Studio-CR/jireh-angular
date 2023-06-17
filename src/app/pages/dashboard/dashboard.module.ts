import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {WidgetsModule} from '../../_metronic/partials';
import {TranslationModule} from "../../modules/i18n";
import {InlineSVGModule} from "ng-inline-svg";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    TranslationModule,
    InlineSVGModule,
    NgbModule,
    MatPaginatorModule
  ],
})
export class DashboardModule {
}
