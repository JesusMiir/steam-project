import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

// jerarquía: guest < user < admin
const rank: Record<string, number> = { guest: 0, user: 1, admin: 2 };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    const user = req.user; // viene del JwtStrategy
    if (!user) throw new ForbiddenException("Not authenticated");

    const userRank = rank[user.role?.toLowerCase() ?? "guest"] ?? 0;
    // si pones Roles('user') aceptamos user o admin
    const minRank = Math.min(...required.map((r) => rank[r]));
    if (userRank < minRank) {
      throw new ForbiddenException("Insufficient role");
    }
    return true;
  }
}
