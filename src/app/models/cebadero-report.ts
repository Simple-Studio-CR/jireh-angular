/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

export interface CebaderosReport {
  [month: string]: {
    [day: string]: {
      [cebadero: string]: {
        consumo: boolean;
      };
    };
  };
}
