import {NgModule, Pipe} from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemProviderComponent} from "./item-provider.component";
import { FormItemProviderComponent } from './form-item-provider/form-item-provider.component';

@NgModule({
  declarations: [ItemProviderComponent, FormItemProviderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ItemProviderComponent,
      },
      {
        path: 'view',
        component: FormItemProviderComponent,
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
export class ItemProviderModule {}
