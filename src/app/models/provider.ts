import {IssuingBranch} from "./issuing-branch";
import {IdentificationType} from "./identification-type";

export class Provider {
  id:number;
  commercialName: string;
  creditDays: string;
  description: string;
  email: string;
  email2: string;
  debt: string;
  fe:boolean;
  idProvedor:number;
  identification:string;
  note: string;
  payMethod: string;
  phone: string;
  phone2: string;
  providerCode: number;
  providerType: string;
  socialReasonName: string;
  status:boolean;
  billRegister:string;
  branch: IssuingBranch[];
  identificationType: IdentificationType[];
}
