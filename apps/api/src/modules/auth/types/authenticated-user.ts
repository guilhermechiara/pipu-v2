export type AuthenticatedUser = {
  organizationId: string;
  userId: string;
  externalOrganizationId: string;
  externalUserId: string;
  sub: string;
  sid: string;
  jti: string;
  role: string;
  permissions: string[];
  featureFlags: string[];
  exp: number;
  iat: number;
};
