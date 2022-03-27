import {NgModule} from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {ProvidersComponent} from "./providers.component";
import { FormProvidersComponent } from './form-providers/form-providers.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ProvidersComponent, FormProvidersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProvidersComponent,
      },
      {
        path: 'view',
        component: FormProvidersComponent,
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
  providers: [DatePipe]
})
export class ProvidersModule {}
