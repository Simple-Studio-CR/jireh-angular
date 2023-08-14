/*
 * Copyright (c) 2023
 * Creado por Andres Mayorga, si lo mejoran compartir a andres.mayorga07@gmail.com
 */

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() {}

  // Diálogo de confirmación para eliminar
  confirmDeletion(): Promise<any> {
    return Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });
  }

  // Diálogo de éxito
  showSuccessMessage(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  // Diálogo de edición
  editDialogGomosas(r: any): Promise<any> {
    return Swal.fire({
      title: 'Editar',
      html: `
       <div>
         <input type="checkbox" id="roedor" ${r.roedor ? 'checked' : ''}> Roedores
       </div>
       <div>
         <input type="checkbox" id="insectos" ${r.insectos ? 'checked' : ''}> Insectos
       </div>
       <div>
         <input type="checkbox" id="sucia" ${r.sucia ? 'checked' : ''}> Sucia
       </div>
     `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          roedor: (document.getElementById('roedor') as HTMLInputElement).checked,
          insectos: (document.getElementById('insectos') as HTMLInputElement).checked,
          sucia: (document.getElementById('sucia') as HTMLInputElement).checked
        }
      }
    });
  }

}
