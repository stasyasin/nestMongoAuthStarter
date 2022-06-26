import { Role } from '../../../shared/enums/role.enum';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
}


