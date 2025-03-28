import { All, Controller, Get, Req, Res } from "@nestjs/common";
import { toNodeHandler } from "better-auth/node";
import { Request, Response } from "express";
// import { auth } from "../../lib/auth";
import { CurrentUser, User } from "../decorators/current-user.decorator";
import { AuthService } from "../services/auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @All("api/auth/*")
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(this.authService.auth)(req, res);
  }

  @Get("auth/secret")
  getSecret(@CurrentUser() user: User) {
    return user;
  }
}
