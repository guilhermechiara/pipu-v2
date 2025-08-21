import { Injectable, Logger } from "@nestjs/common";
import { CreateUserProps, User } from "@app/modules/auth/entities/user";
import { UserRepository } from "@app/modules/auth/repositories/user.repository";
import { AuthService } from "@app/modules/auth/services/auth.service";
import { UserStatus } from "@app/modules/auth/enums/user-status";

@Injectable()
export class UsersService {
  private readonly _logger = new Logger(UsersService.name);

  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _authService: AuthService,
  ) {}

  /**
   * Creates a new user and associates it with an external organization.
   * Handles rollback in case of failure.
   *
   * @param {CreateUserProps} input - The properties required to create a new user, including user details and associated organization ID.
   * @return {Promise<User>} A promise that resolves with the created user object.
   */
  async create(input: CreateUserProps): Promise<User> {
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

      await this._userRepository.save(user);

      return user;
    } catch (error) {
      this._logger.error(`Failed to create user`, error);
      this._logger.log(`Rolling back user creation...`);

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

  /**
   * Deletes a user from the system and removes their external authentication details if they exist.
   *
   * @param {string} id - The unique identifier of the user to be deleted.
   * @param {string} organizationId - The identifier of the organization to which the user belongs.
   * @return {Promise<void>} A promise that resolves when the deletion process is complete.
   */
  async delete(id: string, organizationId: string): Promise<void> {
    const user = await this._userRepository.findById(id, organizationId);

    if (user) {
      const externalUser = await this._authService.findByExternalUserId(
        user.id,
      );

      await this._authService.deleteExternalUser(externalUser.id);
      await this._userRepository.delete(id, organizationId);
    }
  }
}
