import {Authority} from "./authority";

export class Users {
  id: number;
  name: string;
  lastName1: string;
  lastName2: string;
  email: string;
  password: string;
  userName: string;
  enabled: boolean;
  tries: number;
  address: string;
  authorities: Authority[] = [];

}
