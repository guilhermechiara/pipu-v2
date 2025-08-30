import { Controller, Get } from "@nestjs/common";
import { GetCurrentProfileQuery } from "@app/modules/profile/queries/get-current-profile.query";
import { CurrentUser } from "@app/modules/auth/decorators/current-user.decorator";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

@Controller("profile")
export class ProfileController {
  constructor(
    private readonly _getCurrentProfileQuery: GetCurrentProfileQuery,
  ) {}

  @Get("me")
  public async getCurrentProfile(@CurrentUser() user: AuthenticatedUser) {
    return this._getCurrentProfileQuery.execute({ user });
  }
}
