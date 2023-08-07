import { AddressNeighborhood } from "./address-neighborhood";
import { AddressProvince } from "./address-province";
import { AddressCanton } from "./address-canton";
import { AddressDistrict } from "./address-district";

/**
 * Representa un cliente.
 */
export class Clients {
  /**
   * ID único del cliente.
   */
  id: number;

  /**
   * Número de identificación del cliente.
   */
  identification: string;

  /**
   * Tipo de identificación del cliente (por ejemplo, cédula, pasaporte, etc.).
   */
  typeOfId: string;

  /**
   * Nombre del cliente.
   */
  name: string;

  /**
   * Correo electrónico del cliente.
   */
  mail: string;

  /**
   * Información de contacto del cliente.
   */
  contact: string;

  /**
   * Alcance o ámbito del cliente (por ejemplo, nacional, regional, etc.).
   */
  scope: string;

  /**
   * Provincia donde se encuentra el cliente.
   */
  province: AddressProvince[];

  /**
   * Cantón donde se encuentra el cliente.
   */
  canton: AddressCanton[];

  /**
   * Distrito donde se encuentra el cliente.
   */
  district: AddressDistrict[];

  /**
   * Barrio o vecindario donde se encuentra el cliente.
   */
  neigh: AddressNeighborhood[];

  /**
   * Dirección física del cliente.
   */
  address: string;
}
