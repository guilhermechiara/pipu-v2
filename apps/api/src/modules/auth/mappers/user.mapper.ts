import { Mapper } from "@app/common/mappers/mapper";
import { User } from "@app/modules/auth/entities/user";
import { User as PrismaUser } from "@prisma/client";
import { UserStatus } from "@app/modules/auth/enums/user-status";
import { UserResponse } from "@pipu/api";

export class UserMapper implements Mapper<User, PrismaUser, UserResponse> {
  toModel(item: PrismaUser): User {
    return User.from({
      id: item.id,
      email: item.email,
      externalId: item.externalId,
      status: item.status as UserStatus,
      organizationId: item.organizationId,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
    });
  }

  toDatabase(item: User): PrismaUser {
    return {
      id: item.id,
      email: item.email,
      externalId: item.externalId,
      status: item.status,
      organizationId: item.organizationId,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
    };
  }

  toResponse(item: User): UserResponse {
    return item.toJSON();
  }
}
