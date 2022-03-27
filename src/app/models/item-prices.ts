import { Item } from "./item";
import {Currency} from "./currency";

export class ItemPrices {
  id: number;
  finalPrice: number;
  ivaPercentage: number;
  taxesAmount: number;
  price: number;
  purchasePrice: number;
  roundOut: number;
  unit: number;
  utility: number;
  weight: number;
  item: Item[];
  iva: number;
  taxes: number;
  currency: Currency[];
}
