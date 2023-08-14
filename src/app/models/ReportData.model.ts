/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

export interface ReportData {
  [month: string]: {
    [day: number]: {
      [trap: number]: {
        insectos: boolean;
        roedor: boolean;
        sucia: boolean;
      };
    };
  };
}
