import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthHTTPService} from "../../modules/auth/services/auth-http";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Products} from "../../models/products";
import {ProductsService} from "../../services/products.service";
import {AuthService} from "../../modules/auth";
import {ListProducts} from "../../models/list-products";

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
  products: Products[];
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

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.rangePage();
  }

  private rangePage() {
    this.service.listAll(this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        console.log(i)
        this.products = i.content as Products[];
        console.log(i.content)
        this.totalRegister = i.totalElements
        this.cd.detectChanges();
      });
  }


  public newClient(){
    this.router.navigate(['/items/view'])
  }


  clickEnterClient(id: number) {
    sessionStorage.setItem('productId', String(id));
    this.router.navigate(['/items/view'])

  }

}
