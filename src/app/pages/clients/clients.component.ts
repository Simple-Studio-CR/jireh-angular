import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ClientsService} from "../../services/clients.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Clients} from "../../models/clients";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  title = 'Clientes';
  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;
  clients: Clients[];
  edit = false;

  constructor(private service: ClientsService,
              public authHttpService: AuthHTTPService,
              private router: Router,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    sessionStorage.removeItem('clientId');
    sessionStorage.removeItem('clientName');
    sessionStorage.removeItem('client');
    this.rangePage();
  }

  clickEnterReport(id: string, name: string, client: Clients) {
    sessionStorage.setItem('clientId', id);
    sessionStorage.setItem('clientName', name);
    sessionStorage.setItem('client', JSON.stringify(client));
    this.router.navigate(['reports']);
  }

  clickEnterClientForm(id: string | null, name: string | null, client: Clients | null) {
    if (typeof id === "string") {
      sessionStorage.setItem('clientId', id);
    }
    if (typeof name === "string") {
      sessionStorage.setItem('clientName', name);
    }
    if (client) {
      sessionStorage.setItem('client', JSON.stringify(client));
    }

    this.router.navigate(['clients/view'])
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {
    let letsContinue = false;

    let min = 0;
    let max = 3;

    this.service.listAll()
      .subscribe(i => {
        this.clients = i as Clients[];
        this.cd.detectChanges();
      })
  }

}
