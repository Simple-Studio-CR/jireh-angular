import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Users} from "../../../models/users";
import {UserAuthRegister} from "../../../models/user-auth-register";
import {AuthHTTPService} from "../../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {userAuthRegisterService} from "../../../services/user-auth-register.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-overview',
  templateUrl: './techs.component.html',
})
export class TechsComponent implements OnInit {

  users: Users[];
  userAuthRegister: UserAuthRegister[];
  title: '';

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  constructor(
    public authHttpService: AuthHTTPService,
    private router: Router,
    private serviceAuthRegister: userAuthRegisterService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.rangePage();
  }
  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {
    this.serviceAuthRegister.findUserAuthRegister('andres', 'ROLE_TECH', this.pageNo + 1, this.pageSize).subscribe(register => {
      this.users = register.content as Users[];
      this.cd.detectChanges();
    })
  }

  newClient() {

  }

  clickEnterClient(id: number) {

  }
}
