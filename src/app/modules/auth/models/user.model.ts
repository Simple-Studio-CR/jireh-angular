import {AuthModel} from './auth.model';
import {Authority} from "../../../models/authority";

export class UserModel extends AuthModel {
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
  pic: string;
  authorities: Authority[] = [];

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.userName = user.userName || '';
    this.password = user.password || '';
    this.lastName1 = user.lastName1 || '';
    this.lastName2 = user.lastName2 || '';
    this.email = user.email || '';
    this.authorities = user.authorities || [];
    this.tries = user.tries || 0;
    this.name = user.name || '';
    this.enabled = user.enabled || true;
    this.address = user.address;
    this.pic = user.pic || './assets/media/users/default.jpg';
  }
}
