import {NgModule} from "@angular/core";
import {EquipmentComponent} from "./equipment.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {InlineSVGModule} from "ng-inline-svg";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [EquipmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EquipmentComponent,
      },
    ]),
    WidgetsModule,
    TranslationModule,
    DropdownMenusModule,
    InlineSVGModule,
    MatPaginatorModule,
  ],
})
export class EquipmentModule {}
