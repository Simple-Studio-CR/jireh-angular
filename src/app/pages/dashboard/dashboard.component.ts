import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Clients} from "../../models/clients";
import {ClientsService} from "../../services/clients.service";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;
  clients: Clients[];
  edit = false;
  constructor(private service: ClientsService,
              public authHttpService: AuthHTTPService,
              private router: Router,
              private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    sessionStorage.removeItem('clientName')
    sessionStorage.removeItem('clientId')
    sessionStorage.removeItem('clientIdentification')
    sessionStorage.removeItem('client');
    this.rangePage();
  }
  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.clients = i.content as Clients[];
        this.totalRegister = i.totalElements
        console.log(i)
        this.cd.detectChanges();
      })
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  clickEnterClientForm(id: number | null, name: string | null, client: Clients | null) {
    if (typeof id === "number") {
      sessionStorage.setItem('clientId', String(id));
    }
    if (typeof name === "string") {
      sessionStorage.setItem('clientName', name);
    }
    if (client) {
      sessionStorage.setItem('client', JSON.stringify(client));
    }

    this.router.navigate(['clients/view'])
  }

  clickEnterReport(id: number, name: string, client: Clients) {
    sessionStorage.setItem('clientId', String(id));
    sessionStorage.setItem('clientName', name);
    sessionStorage.setItem('client', JSON.stringify(client));
    this.router.navigate(['reports']);
  }
}
