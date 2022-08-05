import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {AuthHTTPService} from "../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Item} from "../../models/item";
import {Products} from "../../models/products";
import {ProductsService} from "../../services/products.service";
import {AuthService} from "../../modules/auth";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  title = 'Productos';
  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;
  product: Products[];
  edit = false;


  constructor(
    private service: ProductsService,
    public authHttpService: AuthHTTPService,
    public authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    sessionStorage.removeItem('productId')
    this.rangePage();
  }

  clickEnterIssuing(id: string) {
    sessionStorage.setItem('emisorId', id);
    this.router.navigate(['/issuing/branch']);
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.product = i as Products[];
        this.cd.detectChanges();
      });
  }


  public newClient(){
    this.router.navigate(['/items/view'])
  }


  clickEnterClient(id: string) {
    sessionStorage.setItem('productId', id);
    this.router.navigate(['/items/view'])

  }

}
