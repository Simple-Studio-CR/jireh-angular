import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../../services/clients.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Clients} from "../../models/clients";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";
import {FormClientsComponent} from "./form-clients/form-clients.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  title = 'Clientes';
  clientList: Clients[];

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;


  constructor(private service: ClientsService, public authHttpService: AuthHTTPService, private router: Router) {
  }

  ngOnInit(): void {
    this.rangePage();
    sessionStorage.removeItem('clientId');
    sessionStorage.removeItem('itemId');
    sessionStorage.removeItem('providerId');
  }

  clickEnterClient(id: number) {
    sessionStorage.setItem('clientId', String(id));
    this.router.navigate(['/clients/view']);
  }

  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.clientList = i.content as Clients[];
        this.totalRegister = i.totalElements as number;
      });
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

}
