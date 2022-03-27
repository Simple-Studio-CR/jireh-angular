import {IssuingBranch} from "./issuing-branch";
import {Currency} from "./currency";
import {ItemDepartment} from "./item-department";
import {ItemFamily} from "./item-family";
import {Cabys} from "./cabys";
import {InvoiceIVACode} from "./invoice-ivacode";
import {InvoiceTaxes} from "./invoice-taxes";

export class Item {
  id:number;
  barcode1:string;
  barcode2:string;
  barcode3:string;
  cabys: Cabys;
  code:string;
  codeFromProvider: string
  branch: IssuingBranch;
  name: string;
  department: ItemDepartment;
  family: ItemFamily;
  note: string;
  status: boolean;
  finalPrice: number;
  ivaPercentage: number;
  taxesAmount: number;
  price: number;
  purchasePrice: number;
  roundOut: boolean;
  unit: boolean;
  utility: number;
  weight: boolean;
  units: string;
  packing: string;
  boxes: string;
  iva: InvoiceIVACode;
  taxes: InvoiceTaxes;
  currency: Currency;
}
