import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InlineSVGModule} from "ng-inline-svg";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminsComponent} from "./admins/admins.component";
import {TechsComponent} from "./techs/techs.component";
import {UsersClientsComponent} from "./users/users-clients.component";
import {UserRouterModule} from "./user-router.module";

@NgModule({
  declarations: [
    UserComponent,
    AdminsComponent,
    TechsComponent,
    UsersClientsComponent
  ],
  imports: [
    CommonModule,
    UserRouterModule,
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
export class UserModule{}
