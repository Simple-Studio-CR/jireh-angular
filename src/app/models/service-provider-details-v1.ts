import {Products} from "./products";
import {Equipment} from "./equipment";

export class ServiceProviderDetailsV1{
  id:string;
  products:Products;
  equipment: Equipment;
  serviceProviderId: string;
  timeOff: string;
}
