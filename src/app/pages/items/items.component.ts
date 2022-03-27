import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../services/item.service";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Item} from "../../models/item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  title: 'Productos';
  items: Item[]

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;


  constructor(
    private service: ItemService,
    public authHttpService: AuthHTTPService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.rangePage();
    sessionStorage.removeItem('clientId');
    sessionStorage.removeItem('itemId');
    sessionStorage.removeItem('providerId');
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }
  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.items = i.content as Item[];
        this.totalRegister = i.totalElements as number;
      });
  }

  clickEnterItem(id: number) {
    sessionStorage.setItem('itemId', id.toString());
    this.router.navigate(['items/view']);

  }

}
