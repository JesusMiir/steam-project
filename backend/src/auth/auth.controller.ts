import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    // Esta ruta redirige automáticamente a Google
  }

  @Get("callback/google") // ✅ Coincide con redirect_uri registrado
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const profile: any = req.user;

    let user = await this.prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: profile.name || `${profile.firstName} ${profile.lastName}`,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          image: profile.picture,
          provider: "google",
        },
      });
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Redirige al frontend con el JWT como query param
    res.redirect(`http://localhost:5173/login/success?token=${token}`);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Req() req) {
    return req.user; // Esto vendrá del validate() en jwt.strategy.ts
  }
}
