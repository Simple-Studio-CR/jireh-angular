import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ItemProviderService} from "../../services/item-provider.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Item} from "../../models/item";
import {ItemProvider} from "../../models/item-provider";
import {Router} from "@angular/router";
import {IssuingBranch} from "../../models/issuing-branch";

@Component({
  selector: 'app-item-provider',
  templateUrl: './item-provider.component.html',
  styleUrls: ['./item-provider.component.scss']
})
export class ItemProviderComponent implements OnInit {

  totalRegister = 0;
  pageNo = 0;
  pageSize = 10;
  i: number = 1;

  searchForm: FormGroup;

  itemName: String;

  item_provider: ItemProvider[] | null | undefined | any;
  item: Item[] | null | undefined | any = new Item();

  constructor(private service: ItemProviderService, private router: Router) {
  }

  ngOnInit(): void {
    this.takeProviderCode();
    sessionStorage.removeItem('itemProviderId')
    sessionStorage.removeItem('itemProvider')
  }

  takeProviderCode() {
    this.searchForm = new FormGroup({
      providerCode: new FormControl(''),
    })
    this.searchForm.get('providerCode')?.valueChanges.subscribe(codeTake => {
      console.log(codeTake)
      this.rangePage(codeTake)
    })
  }

  paginator(event: PageEvent): void {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.takeProviderCode();
  }

  private rangePage(providerCode: number) {
    let branch: IssuingBranch = JSON.parse(<string>sessionStorage.getItem('branch'))
    console.log(branch)
    this.service.listAll(providerCode, branch, this.pageNo + 1, this.pageSize)
      .subscribe(i => {
        this.item_provider = i.content;
        console.log(i.content)
      });
  }

  clickEditItemProvider(id: number, itemProvider: ItemProvider | null) {
    sessionStorage.setItem('itemProviderId', String(id));
    sessionStorage.setItem('itemProvider', JSON.stringify(itemProvider));
    console.log(JSON.stringify(itemProvider));
    this.router.navigate(['item-provider/view'])
  }
}
