import {IssuingBranch} from "./issuing-branch";
import {IdentificationType} from "./identification-type";
import {ClientsType} from "./clients-type";
import {AddressNeighborhood} from "./address-neighborhood";
import {ClientsCreditType} from "./clients-credit-type";
import {InvoiceDocumentTypeExoneration} from "./invoice-document-type-exoneration";

export class Clients {
  id: number;
  status: boolean;
  branch: IssuingBranch[];
  identificationType: IdentificationType[];
  identification: number;
  socialReasonName: string;
  commercialName: string;
  type: ClientsType[] = [];
  discount: number;
  email: string;
  email2: string;
  phone: string;
  phone2: string;
  description: string;
  note: string;
  neighborhood: AddressNeighborhood[];
  creditType: ClientsCreditType[];
  creditEnd: string;
  creditPeriod: string;
  creditDays: string;
  enabledCredit: boolean;
  creditGrace: string;
  debt: number;
  exonerationType: InvoiceDocumentTypeExoneration[]
  law: string;
  documentNumber: string;
  institutionNumber: string;
  exoneration: string;
  exonerationDateStart: string;
  exonerationDateEnd: string;
  dateEnd: string;

}
