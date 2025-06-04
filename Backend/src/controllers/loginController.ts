import { JsonController, Post, Body } from "routing-controllers";
import { Inject } from "typedi";
import { LoginService } from "../services/session/loginService";

@JsonController("/auth")
export class LoginController {
  constructor(@Inject() private loginService: LoginService) {}

  @Post("/login")
  async login(@Body() { email, password }: { email: string; password: string }) {
    const result = await this.loginService.login(email, password);
    return {
      message: "Login exitoso",
      ...result,
    };
  }
}
