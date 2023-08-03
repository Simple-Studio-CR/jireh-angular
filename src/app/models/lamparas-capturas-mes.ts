/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import {ClientsBranchOffice} from "./clients-branch-office";
import {ClientsWarehouse} from "./clients-warehouse";

export interface LamparasCapturasMes {
  id: number;
  createAt: string;
  branchOffice: ClientsBranchOffice;
  warehouse: ClientsWarehouse;

  trampa: number;
  moscas: number;

  palomillas: number;
  otros: number;
  total: number;
}
