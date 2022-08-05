import {Component, OnInit} from "@angular/core";
import {Users} from "../../models/users";
import {UserAuthRegister} from "../../models/user-auth-register";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {userAuthRegisterService} from "../../services/user-auth-register.service";

@Component({
  selector: 'user-component',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public authHttpService: AuthHTTPService,) {
  }

  ngOnInit(): void {
    sessionStorage.removeItem('typeUser')
  }

  session(type: string) {
    sessionStorage.setItem('typeUser', type)
  }
}
