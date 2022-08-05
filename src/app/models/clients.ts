import {IssuingBranch} from "./issuing-branch";
import {IdentificationType} from "./identification-type";
import {ClientsType} from "./clients-type";
import {AddressNeighborhood} from "./address-neighborhood";
import {ClientsCreditType} from "./clients-credit-type";
import {InvoiceDocumentTypeExoneration} from "./invoice-document-type-exoneration";

export class Clients {
  id: string;
  identification: string;
  typeOfId: string;
  name: string;
  mail: string;
  contact: string;
  scope: string;
  province: number;
  canton: string;
  district: string;
  neigh:string;
  address:string;
}
