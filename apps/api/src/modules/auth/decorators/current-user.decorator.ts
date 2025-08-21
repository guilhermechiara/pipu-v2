import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser;

    if (!user) {
      return undefined;
    }

    return user;
  },
);
