import { Inject, Injectable } from "@nestjs/common";
import { Organization, User, WorkOS } from "@workos-inc/node";
import { authConfig } from "@app/config";
import { ConfigType } from "@nestjs/config";
import { AuthenticationResponse } from "@pipu/api";
import { UserRepository } from "@app/modules/auth/repositories/user.repository";
import { UserNotAllowedException } from "@app/modules/auth/exceptions/user-not-allowed.exception";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { AuthenticatedUser } from "@app/modules/auth/types/authenticated-user";

@Injectable()
export class AuthService {
  private readonly _workOSClient: WorkOS;
  private readonly _jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor(
    private readonly _userRepository: UserRepository,
    @Inject(authConfig.KEY)
    private _authConfig: ConfigType<typeof authConfig>,
  ) {
    this._workOSClient = new WorkOS(_authConfig.api_key);
    const url = this._workOSClient.userManagement.getJwksUrl(
      this._authConfig.client_id,
    );

    this._jwks = createRemoteJWKSet(new URL(url));
  }

  /**
   * Creates a new tenant with the specified details.
   *
   * @param {Object} input - The input parameters for creating the organization.
   * @param {string} input.id - The external identifier for the organization.
   * @param {string} input.name - The name of*/
  async createExternalOrganization(input: {
    id: string;
    name: string;
  }): Promise<Organization> {
    return this._workOSClient.organizations.createOrganization({
      externalId: input.id,
      name: input.name,
    });
  }

  /**
   * Deletes an organization by its unique identifier.
   *
   * @param {string} id - The unique identifier of the organization to delete.
   * @return {Promise<void>} A promise that resolves when the organization has been successfully deleted.
   */
  async deleteExternalOrganization(id: string): Promise<void> {
    const externalOrganization = await this.findOrganizationByExternalId(id);

    if (externalOrganization) {
      await this._workOSClient.organizations.deleteOrganization(id);
    }
  }

  /**
   * Retrieves a user based on the provided external user ID.
   *
   * @param {string} externalUserId - The external ID of the user to be retrieved.
   * @return {Promise<User | null>} A promise that resolves to the user object if found, or null if no user is found.
   */
  async findByExternalUserId(externalUserId: string): Promise<User | null> {
    return this._workOSClient.userManagement.getUserByExternalId(
      externalUserId,
    );
  }

  /**
   * Creates a new user and assigns them to an organization.
   *
   * @param {Object} input - The input parameters for creating a user.
   * @param {string} input.id - The external identifier for the user.
   * @param {string} input.email - The email address of the user.
   * @param {string} input.externalOrganizationId - The identifier of the organization (workOS) to which the user will be assigned.
   * @return {Promise<User>} A promise that resolves to the created user object.
   */
  async createExternalUser(input: {
    id: string;
    email: string;
    organizationId: string;
    externalOrganizationId: string;
  }): Promise<User> {
    const user = await this._workOSClient.userManagement.createUser({
      email: input.email,
      externalId: input.id,
      metadata: {
        external_organization_id: input.organizationId,
      },
    });

    await this._workOSClient.userManagement.createOrganizationMembership({
      userId: user.id,
      organizationId: input.externalOrganizationId,
    });

    return user;
  }

  /**
   * Deletes a user and their associated organization memberships.
   *
   * @param {string} externalUserId - The unique identifier of the user to be deleted.
   * @return {Promise<void>} A promise that resolves once the user and their memberships are deleted.
   */
  async deleteExternalUser(externalUserId: string): Promise<void> {
    await this._workOSClient.userManagement.deleteUser(externalUserId);

    const memberships =
      await this._workOSClient.userManagement.listOrganizationMemberships({
        userId: externalUserId,
      });

    for (const membership of memberships.data) {
      await this._workOSClient.userManagement.deleteOrganizationMembership(
        membership.id,
      );
    }
  }

  /**
   * Retrieves an organization by its external identifier.
   *
   * @param {string} externalId - The external identifier of the organization to retrieve.
   * @return {Promise<Organization | null>} A promise that resolves to the organization object if found, or null if no organization matches the given external identifier.
   */
  async findOrganizationByExternalId(
    externalId: string,
  ): Promise<Organization | null> {
    return this._workOSClient.organizations.getOrganizationByExternalId(
      externalId,
    );
  }

  /**
   * Sends a magic authentication link to the specified email address if the user is active.
   *
   * @param {string} email - The email address of the user requesting the magic authentication link.
   * @return {Promise<void>} A promise that resolves when the magic authentication link is successfully sent.
   * @throws {UserNotAllowedException} If the user associated with the email is not active.
   */
  async requestCode(email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (!user.isActive()) {
      throw new UserNotAllowedException();
    }

    await this._workOSClient.userManagement.createMagicAuth({
      email: email,
    });
  }

  /**
   * Verifies a magic link authentication code for a specific email address.
   *
   * @param {string} email - The email address of the user attempting to authenticate.
   * @param {string} code - The magic link authentication code sent to the user's email address.
   * @return {Promise<AuthenticationResponse>} A promise that resolves to an AuthenticationResponse object containing authentication details such as organization ID, access token, and refresh token.
   */
  async verifyCode(
    email: string,
    code: string,
  ): Promise<AuthenticationResponse> {
    const auth =
      await this._workOSClient.userManagement.authenticateWithMagicAuth({
        email: email,
        code: code,
        clientId: this._authConfig.client_id,
      });

    return {
      organizationId: auth.organizationId,
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
    };
  }

  async verifyAccessToken(accessToken: string): Promise<AuthenticatedUser> {
    const { payload } = await jwtVerify(accessToken, this._jwks);

    return {
      organizationId: payload["urn:pipu:organization_id"] as string,
      userId: payload["urn:pipu:user_id"] as string,
      exp: payload.exp,
      iat: payload.iat,
      sid: payload["sid"] as string,
      jti: payload.jti,
      externalOrganizationId: payload["org_id"] as string,
      role: payload["role"] as string,
      permissions: payload["permissions"] as string[],
      externalUserId: payload.sub,
      sub: payload.sub,
      featureFlags: payload["feature_flags"] as string[],
    };
  }
}
