import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { User } from "@app/modules/auth/entities/user";
import { UserMapper } from "@app/modules/auth/mappers/user.mapper";
import { Prisma } from "@prisma/client";
import {
  DeleteByIdWithOrganizationId,
  FindByIdWithOrganizationId,
} from "@app/common/types/repository.types";

@Injectable()
export class UserRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _userMapper: UserMapper,
  ) {}

  async save(input: User, tx?: Prisma.TransactionClient): Promise<void> {
    const client = this._prismaService.getClient(tx);

    await client.user.upsert({
      where: {
        id: input.id,
      },
      update: this._userMapper.toDatabase(input),
      create: this._userMapper.toDatabase(input),
    });
  }

  async findById(
    input: FindByIdWithOrganizationId,
    tx?: Prisma.TransactionClient,
  ): Promise<User> {
    const client = this._prismaService.getClient(tx);
    const user = await client.user.findUnique({
      where: {
        id: input.id,
        organizationId: input.organizationId,
      },
    });

    return user ? this._userMapper.toModel(user) : null;
  }

  async delete(
    input: DeleteByIdWithOrganizationId,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = this._prismaService.getClient(tx);

    await client.user.delete({
      where: {
        id: input.id,
        organizationId: input.organizationId,
      },
    });
  }

  async findByEmail(
    email: string,
    tx?: Prisma.TransactionClient,
  ): Promise<User> {
    const client = this._prismaService.getClient(tx);
    const user = await client.user.findFirst({
      where: {
        email,
      },
    });

    return user ? this._userMapper.toModel(user) : null;
  }
}
