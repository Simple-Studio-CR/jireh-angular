import {IdentificationType} from "./identification-type";
import {AddressProvince} from "./address-province";
import {AddressCanton} from "./address-canton";
import {AddressDistrict} from "./address-district";
import {AddressNeighborhood} from "./address-neighborhood";
import {IssuingEconomyActivities} from "./issuing-economy-activities";

export class Issuing {

  id: number;
  identificationType: IdentificationType;
  identification: number;
  tokenAccess: string;
  environment: string;
  logo: string;
  socialReasonName: string;
  commercialName: string;
  email: string;
  countryCode: string;
  phone: string;
  fax: string;
  detail1: string;
  detail2: string;
  status: boolean;
  province: AddressProvince;
  canton: AddressCanton[] ;
  district: AddressDistrict[];
  neighborhood: AddressNeighborhood[];
  addressDetails: string;
  certificado: string;
  certificateDate: string;
  certificateExpiration: string;
  userApi: string;
  pwApi: string;
  pingApi: string;
  notificationEmail: string;
  print: string;
  cashierControl: string;
  multiCurrency: string;
  creationDate: string;
  activities: IssuingEconomyActivities[];


}
