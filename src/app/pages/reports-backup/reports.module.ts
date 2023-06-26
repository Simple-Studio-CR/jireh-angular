import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CebaderoComponent} from "./cebaderos/cebadero.component";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {ReportsComponent} from "./reports.component";
import {CebaderoFormComponent} from "./cebaderos/form-cebadero/cebadero-form.component";
import {ServiceProviderComponent} from "./service-provider/service-provider.component";
import {ServiceProviderFormComponent} from "./service-provider/form-service-provider/service-provider-form.component";
import {DetailsComponent} from "./service-provider/form-service-provider/details/details.component";
import {PestComponent} from "./service-provider/form-service-provider/pest/pest.component";
import {RecommendationsComponent} from "./service-provider/form-service-provider/recommendations/recommendations.component";

@NgModule({
  declarations: [
    CebaderoComponent,
    ReportsComponent,
    CebaderoFormComponent,
    ServiceProviderComponent,
    ServiceProviderFormComponent,
    DetailsComponent,
    PestComponent,
    RecommendationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsComponent,
      },
      {
        path: 'cebadero',
        component: CebaderoComponent,
      },
      {
        path: 'cebadero/form',
        component: CebaderoFormComponent,
      },
      {
        path: 'service-provider',
        component: ServiceProviderComponent,
      },
      {
        path: 'service-provider/form',
        component: ServiceProviderFormComponent,
        children: [
          {
            path: 'details',
            component: DetailsComponent
          },
          {
            path: 'pest',
            component: PestComponent
          },
          {
            path: 'recommendations',
            component: RecommendationsComponent
          },
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: '**', redirectTo: 'details', pathMatch: 'full' },
        ]
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
  ],
})
export class ReportsModule {
}
