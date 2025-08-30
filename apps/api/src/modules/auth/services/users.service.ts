import { Injectable, Logger } from "@nestjs/common";
import { CreateUserProps, User } from "@app/modules/auth/entities/user";
import { UserRepository } from "@app/modules/auth/repositories/user.repository";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { UserStatus } from "@app/modules/auth/enums/user-status";
import { Prisma } from "@prisma/client";
import { DeleteByIdWithOrganizationId } from "@app/common/types/repository.types";

@Injectable()
export class UsersService {
  private readonly _logger = new Logger(UsersService.name);

  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _authService: AuthService,
  ) {}

  async create(
    input: CreateUserProps,
    tx?: Prisma.TransactionClient,
  ): Promise<User> {
    const user = User.create({
      ...input,
      status: UserStatus.ACTIVE,
    });

    try {
      const externalOrganization =
        await this._authService.findOrganizationByExternalId(
          input.organizationId,
        );

      const externalUser = await this._authService.createExternalUser({
        id: user.id,
        email: user.email,
        organizationId: input.organizationId,
        externalOrganizationId: externalOrganization.id,
      });

      user.assignExternalId(externalUser.id);

      await this._userRepository.save(user, tx);

      return user;
    } catch (error) {
      this._logger.error(
        `Failed to create user, rolling back user creation...`,
        error,
      );

      const externalUser = await this._authService.findByExternalUserId(
        user.id,
      );

      if (externalUser) {
        await this._authService.deleteExternalUser(externalUser.id);
      }

      this._logger.log(`User creation rolled back`);

      throw error;
    }
  }

  async delete(
    input: DeleteByIdWithOrganizationId,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const user = await this._userRepository.findById(input, tx);

    if (user) {
      await this._userRepository.delete(input, tx);
    }

    const externalUser = await this._authService.findByExternalUserId(input.id);

    if (externalUser) {
      await this._authService.deleteExternalUser(externalUser.id);
    }
  }
}
