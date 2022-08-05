import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {AdminsComponent} from "./admins/admins.component";
import {TechsComponent} from "./techs/techs.component";
import {UsersClientsComponent} from "./users/users-clients.component";

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children:[
      {
        path: 'admin-users',
        component:AdminsComponent
      },
      {
        path: 'tech-users',
        component:TechsComponent
      },
      {
        path: 'client-users',
        component:UsersClientsComponent
      },
      { path: '', redirectTo: 'admin-users', pathMatch: 'full' },
      { path: '**', redirectTo: 'admin-users', pathMatch: 'full' },
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouterModule{}
