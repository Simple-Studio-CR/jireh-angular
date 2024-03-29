import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {ReportsComponent} from "./reports.component";
import {IncidenciasPlagasMensualComponent} from "./incidencias-plagas-mensual/incidencias-plagas-mensual.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {InfoPlagasComponent} from "./info-plaga/info-plagas.component";
import {PuntosMejoraComponent} from "./observaciones-mejoras/puntos-mejora.component";
import {LamparasCapturasMesComponent} from "./lamparas-capturas-mes/lamparas-capturas-mes.component";
import { LamparasChartComponent} from "./lamparas-capturas-mes/chart/lamparas-chart.component";
import {HistorialCapturasLamparasComponent} from "./historial-capturas-lamparas/historial-capturas-lamparas.component";
import {TrampasGomosasComponent} from "./trampas-gomosas/trampas-gomosas.component";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {CebaderoComponent} from "./cebaderos/cebadero.component";
import {ModalCebaderoBlancoComponent} from "./cebaderos/modals/blanco/modal-cebadero-blanco.component";
import {ModalUltimoMesComponent} from "./cebaderos/modals/ultimo-mes/modal-ultimo-mes.component";
import {ModalTodosComponent} from "./cebaderos/modals/todos/modal-todos.component";
import {ModalSoloUnoComponent} from "./cebaderos/modals/solo-uno/modal-solo-uno.component";

@NgModule({
  declarations: [
    ReportsComponent,
    IncidenciasPlagasMensualComponent,
    InfoPlagasComponent,
    PuntosMejoraComponent,
    LamparasCapturasMesComponent,
    LamparasChartComponent,
    HistorialCapturasLamparasComponent,
    TrampasGomosasComponent,
    CebaderoComponent,
    ModalCebaderoBlancoComponent,
    ModalUltimoMesComponent,
    ModalTodosComponent,
    ModalSoloUnoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsComponent,
      },
      {
        path: 'incidencias-plaga-mensual',
        component: IncidenciasPlagasMensualComponent,
      },
      {
        path: 'info-plagas',
        component: InfoPlagasComponent,
      },
      {
        path: 'puntos-mejora',
        component: PuntosMejoraComponent,
      },
      {
        path: 'lamparas-capturas-mes',
        component: LamparasCapturasMesComponent,
        children: [
          {
            path: 'chart',
            component: LamparasChartComponent,
          }
        ]
      },
      {
        path: 'historial-capturas-lamparas',
        component: HistorialCapturasLamparasComponent,
        children: [
        ]
      },
      {
        path: 'trampas-gomosas',
        component: TrampasGomosasComponent,
      },
      {
        path: 'historial-capturas-trampas',
        component: CebaderoComponent,
      }
    ]),
    WidgetsModule,
    TranslationModule,
    MatPaginatorModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class ReportsModule {
}
