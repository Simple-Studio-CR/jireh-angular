import {AddressProvince} from "./address-province";
import {AddressCanton} from "./address-canton";
import {AddressDistrict} from "./address-district";
import {AddressNeighborhood} from "./address-neighborhood";
import {Clients} from "./clients";

export class ClientsBranchOffice{
  id: number
  name: string
  email: string
  contact: string
  phone: string
  clientId: Clients
  province: AddressProvince
  canton: AddressCanton
  district: AddressDistrict
  neighborhood: AddressNeighborhood
  addressDetails: string
}
