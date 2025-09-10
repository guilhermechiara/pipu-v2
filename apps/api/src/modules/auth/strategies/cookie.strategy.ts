import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-cookie";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, "cookie") {
  constructor(private readonly _authService: AuthService) {
    super({
      cookieName: "auth",
    });
  }

  async validate(token: string): Promise<AuthenticatedUser> {
    const user = await this._authService.verifyAccessToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
