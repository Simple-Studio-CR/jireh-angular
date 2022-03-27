import {Item} from "./item";
import {ItemDepartment} from "./item-department";
import {ItemFamily} from "./item-family";
import {Provider} from "./provider";
import {InvoiceIVACode} from "./invoice-ivacode";

export class ItemProvider{
  id:number;
  item: Item;
  barcode: string;
  description: string;
  department: ItemDepartment;
  family: ItemFamily;
  brand: string;
  provider: Provider;
  iva: InvoiceIVACode;
  ivaPercentage: number;
  price: number;
  discountPercentage: number;
  discount: string;
  activateDiscount: boolean;
  note: string;
  providerCode:string
  date:Date;
  codeFromProvider:string;
  ivEspecial:string;
}
