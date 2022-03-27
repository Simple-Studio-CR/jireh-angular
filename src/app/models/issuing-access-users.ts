import {Users} from "./users";
import {Issuing} from "./issuing";
import {Authority} from "./authority";

export class IssuingAccessUsers {
  id:number;
  user: Users;
  issuing: Issuing;
  authority: Authority;
}
