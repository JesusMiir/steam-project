import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./google.strategy";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { RolesGuard } from "./roles.guard";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "default-secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AuthModule {}
