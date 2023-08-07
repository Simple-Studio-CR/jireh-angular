import { Authority } from "./authority";

/**
 * Representa un usuario en el sistema.
 */
export class Users {
  /**
   * ID único del usuario.
   */
  id: number;

  /**
   * Nombre del usuario.
   */
  name: string;

  /**
   * Primer apellido del usuario.
   */
  lastName1: string;

  /**
   * Segundo apellido del usuario.
   */
  lastName2: string;

  /**
   * Dirección de correo electrónico del usuario.
   */
  email: string;

  /**
   * Contraseña del usuario.
   */
  password: string;

  /**
   * Nombre de usuario del usuario.
   */
  userName: string;

  /**
   * Indica si el usuario está habilitado en el sistema.
   */
  enabled: boolean;

  /**
   * Número de intentos de inicio de sesión fallidos.
   */
  tries: number;

  /**
   * Dirección física del usuario.
   */
  address: string;

  /**
   * Lista de roles o autoridades asignadas al usuario.
   */
  authorities: Authority[] = [];
}
