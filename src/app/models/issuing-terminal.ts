import {IssuingBranch} from "./issuing-branch";

export class IssuingTerminal {

  id:number;
  terminalNumber: number;
  branch: IssuingBranch[];
  terminalName: string;
  status: boolean;
  consecutiveFe: number;
  consecutiveTe: number;
  consecutiveNd: number;
  consecutiveNc: number;
  consecutiveCCE: number;
  consecutiveCPCE: number;
  consecutiveRCE: number;
  consecutiveFEE: number;
  consecutiveFEC: number;
  consecutiveTiquete: number;
}
