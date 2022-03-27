import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {ClientsComponent} from "./clients.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import { FormClientsComponent } from './form-clients/form-clients.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ClientsComponent, FormClientsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientsComponent,
      },
      {
        path: 'view',
        component: FormClientsComponent,
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
})
export class ClientsModule {}
