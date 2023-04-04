import { User } from '../user';

export interface IuserRepository {
  findByEmail: (email: string) => Promise<User>;

  save: (
    id: string,
    name: string,
    email: string,
    passwrod: string,
    signupVerifyToken: string,
  ) => Promise<void>;
}
