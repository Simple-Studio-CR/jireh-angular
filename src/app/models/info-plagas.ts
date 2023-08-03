import {ClientsBranchOffice} from "./clients-branch-office";
import {ClientsWarehouse} from "./clients-warehouse";
import {PestType} from "./pest-type";
import {Calificacion} from "./calificacion";

export class InfoPlagas {
  id: number;
  createAt: string;
  branchOffice: ClientsBranchOffice;
  warehouse: ClientsWarehouse;
  clasificacion: Calificacion;
  pestType: PestType;
  comportamiento: string;
  cicloDesarrollo: string;
  promedioVida: string;

}
