import { Service } from "typedi";
import { User } from "../models/user/model/userModel";

@Service()
export class UserRepository {
  // Cuenta la cantidad total de usuarios
  async countUsers(): Promise<number> {
    return await User.count();
  }

  // Crea un usuario
  async createUser(data: { email: string; password: string; role: string }) {
    return await User.create(data);
  }

  // Busca usuario por email
  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }
}