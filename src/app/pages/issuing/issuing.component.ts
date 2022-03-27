import { Component, OnInit } from '@angular/core';
import {IssuingAccessUsers} from "../../models/issuing-access-users";
import {Issuing} from "../../models/issuing";
import {IssuingService} from "../../services/issuing.service";
import {AuthService} from "../../modules/auth";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {AddressProvince} from "../../models/address-province";

@Component({
  selector: 'app-issuing',
  templateUrl: './issuing.component.html',
  styleUrls: ['./issuing.component.scss']
})
export class IssuingComponent implements OnInit {

  issuingAccessUsers: IssuingAccessUsers;
  province: AddressProvince;
  provicneName: string;
  issuings: Issuing[];
  roles: String[];
  edit = false;

  addIssuing = 'Agregar una nueva empresa';

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;

  constructor(
    private service: IssuingService,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rangePage();
    sessionStorage.removeItem('newIssuing');
    sessionStorage.removeItem('editIssuing');
  }
  clickEnterIssuing(id: number) {
    sessionStorage.setItem('emisorId', String(id));

    this.router.navigate(['branch']);
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }
  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.issuings = i.content as Issuing[];

        this.totalRegister = i.totalElements as number;
        for (let j = 0; j < this.totalRegister; j++) {
          this.service.findRoles(this.issuings[j].id).subscribe(r => {
            // @ts-ignore
            this.province = this.issuings[j].province
            console.log(this.province)
            this.provicneName = this.province.province
            console.info('aqui vamos', this.provicneName)
            this.roles = r.content as String[];
            if (r.toString() === 'ROLE_ADMIN')
              this.edit = false;
            if (r.toString() === 'ROLE_USER')
              this.edit = true;
          });
        }
      });
  }
  public newIssuing(id: number, edit: Boolean) {
    if (edit) {
      sessionStorage.setItem('editIssuing', String(id));
    }
    if (!edit) {
      sessionStorage.setItem('newIssuing', String(id));
    }
    this.router.navigate(['/issuing/newIssuing'])
  }

}
