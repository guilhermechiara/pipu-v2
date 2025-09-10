import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { authConfig } from "@app/config";
import { AuthController } from "@app/modules/auth/controllers/auth.controller";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { UsersService } from "@app/modules/auth/services/users.service";
import { UserRepository } from "@app/modules/auth/repositories/user.repository";
import { UserMapper } from "@app/modules/auth/mappers/user.mapper";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@app/modules/auth/guards/auth.guard";
import { MagicAuthStrategy } from "@app/modules/auth/strategies/magic-auth.strategy";
import { WorkOSErrorsMapper } from "@app/modules/auth/mappers/workos-errors.mapper";

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [authConfig] }), PassportModule],
  providers: [
    AuthService,
    UsersService,
    UserRepository,
    UserMapper,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MagicAuthStrategy,
    WorkOSErrorsMapper,
  ],
  controllers: [AuthController],
  exports: [AuthService, UsersService, UserRepository, UserMapper],
})
export class AuthModule {}
