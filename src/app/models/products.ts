import {ListProducts} from "./list-products";

export class Products{
  id:number;
  name:string;
  sanitaryPermission:string;
  features:string;
  dose:string;
  labelColor:string;
  reEntryTime: string
  control: string
  listProducts: ListProducts[]
  isActive: boolean
}
