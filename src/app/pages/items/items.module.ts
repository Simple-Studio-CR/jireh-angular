import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {ItemsComponent} from "./items.component";
import { FormItemsComponent } from './form-items/form-items.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ItemsComponent, FormItemsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ItemsComponent,
      },
      {
        path: 'view',
        component: FormItemsComponent,
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
export class ItemsModule {}
