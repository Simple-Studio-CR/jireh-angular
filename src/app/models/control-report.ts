import {Clients} from "./clients";
import {ClientsWarehouse} from "./clients-warehouse";

export class ControlReport{
  id:string;
  enabled:boolean;
  clients:Clients;
  clientName:string;
  clientAddress:string;
  warehouse:ClientsWarehouse;
  createAt:string;
  startTime:string;
  endTime: string;
  total:number;
}
