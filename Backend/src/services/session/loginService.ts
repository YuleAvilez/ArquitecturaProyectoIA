import { Service } from "typedi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRepository } from "../../repositories/userRepository";

@Service()
export class LoginService {
  constructor(private userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return { token, role: user.role };
  }
}
