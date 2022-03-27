import {Issuing} from "./issuing";
import {IssuingEconomyActivities} from "./issuing-economy-activities";

export class IssuingBranch {
  id: number;
  addresDetails: string;
  branchMail: string;
  branchName: string;
  branchPhone: string;
  branchManager: string;
  issuing: Issuing;
  status: boolean;
  branchNumber: number;
  activities: IssuingEconomyActivities;
}
