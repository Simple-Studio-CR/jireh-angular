import {ClientsWarehouse} from "./clients-warehouse";
import {PestType} from "./pest-type";
import {Calificacion} from "./calificacion";
import {Observaciones} from "./observaciones";
import {ClientsBranchOffice} from "./clients-branch-office";

export class IncidenciasPlagasMensual{
  id:number;
  createAt:string;
  branchOffice:ClientsBranchOffice;
  warehouse:ClientsWarehouse;
  pestType:PestType;
  cuantificacion:string;
  calificacion:Calificacion;
  observaciones:string;
}
