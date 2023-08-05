export class HitorialAnualModel {
  private _numeroTrampas: number;
  private _numeroCapturas: number;
  private _mes: string;

  get numeroTrampas(): number {
    return this._numeroTrampas;
  }
  set numeroTrampas(value: number) {
    this._numeroTrampas = value;
  }
  get numeroCapturas(): number {
    return this._numeroCapturas;
  }
  set numeroCapturas(value: number) {
    this._numeroCapturas = value;
  }
  get mes(): string {
    return this._mes;
  }
  set mes(value: string) {
    this._mes = value;
  }
}
