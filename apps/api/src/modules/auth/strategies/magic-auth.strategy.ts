import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

@Injectable()
export class MagicAuthStrategy extends PassportStrategy(
  Strategy,
  "magic-auth",
) {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<AuthenticatedUser> {
    const user = await this._authService.verifyAccessToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
