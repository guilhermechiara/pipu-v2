import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "@app/modules/auth/decorators/public.decorator";

@Injectable()
export class AuthGuard extends PassportAuthGuard(["magic-auth"]) {
  constructor(private readonly _reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
