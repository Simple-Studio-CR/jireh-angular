import {Products} from "./products";
import {ActiveIngredient} from "./active-ingredient";

export class ListProducts{
  id:number
  product: Products
  activeIngredient: ActiveIngredient
  quantity: string
  isActive: boolean
}
