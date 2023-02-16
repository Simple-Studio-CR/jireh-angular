import {ControlReport} from "./control-report";
import {ClientsWarehouse} from "./clients-warehouse";

export class Feedlots{
  id:number;
  controlReport:ControlReport;
  warehouse:ClientsWarehouse;
  numberFeedlot:number;
  type:string;
  eats:string;
  status:string;
  observations:string;
  createAt:string;
}
