import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {ClientsComponent} from "./clients.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {FormClientsComponent} from './form-clients/form-clients.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BranchFormClientsComponent} from "./form-clients/branch-clients/branch-form-clients.component";

@NgModule({
  declarations: [ClientsComponent, FormClientsComponent, BranchFormClientsComponent],
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
      {
        path: 'view/branch',
        component: BranchFormClientsComponent,

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
export class ClientsModule {
}
