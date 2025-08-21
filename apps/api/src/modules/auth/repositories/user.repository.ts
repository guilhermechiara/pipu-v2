import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/infrastructure/database/prisma.service";
import { User } from "@app/modules/auth/entities/user";
import { UserMapper } from "@app/modules/auth/mappers/user.mapper";

@Injectable()
export class UserRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _userMapper: UserMapper,
  ) {}

  async save(input: User): Promise<void> {
    await this._prismaService.user.upsert({
      where: {
        id: input.id,
      },
      update: this._userMapper.toDatabase(input),
      create: this._userMapper.toDatabase(input),
    });
  }

  async findById(id: string, organizationId: string): Promise<User> {
    const user = await this._prismaService.user.findUnique({
      where: {
        id,
        organizationId,
      },
    });

    return user ? this._userMapper.toModel(user) : null;
  }

  async delete(id: string, organizationId: string): Promise<void> {
    await this._prismaService.user.delete({
      where: {
        id,
        organizationId,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this._prismaService.user.findFirst({
      where: {
        email,
      },
    });

    return user ? this._userMapper.toModel(user) : null;
  }
}
