import {AddressNeighborhood} from "./address-neighborhood";
import {AddressProvince} from "./address-province";
import {AddressCanton} from "./address-canton";
import {AddressDistrict} from "./address-district";

export class Clients {
  id: number;
  identification: string;
  typeOfId: string;
  name: string;
  mail: string;
  contact: string;
  scope: string;
  province: AddressProvince;
  canton: AddressCanton;
  district: AddressDistrict;
  neigh:AddressNeighborhood;
  address:string;
}
