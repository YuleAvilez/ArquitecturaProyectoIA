import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Service } from "typedi";

dotenv.config();

@Service()
export class JwtService {
  async create(data: object): Promise<string> {
    try {
      const token = jwt.sign({ data }, process.env.SECRET_KEY as string, {
        expiresIn: "30m",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}
