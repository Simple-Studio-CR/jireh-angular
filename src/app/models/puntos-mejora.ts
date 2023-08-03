/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ClientsBranchOffice} from "./clients-branch-office";
import {ClientsWarehouse} from "./clients-warehouse";

export class PuntosMejora {
  id: number;
  createAt: string;
  branchOffice: ClientsBranchOffice;
  warehouse: ClientsWarehouse;

  puntosDeMejora: string;
  observaciones: string;
  otrasLabores: string;

}
