import { Module } from "@nestjs/common";
import { OrganizationsController } from "./controllers/organizations.controller";
import { CreateOrganizationCommand } from "@app/modules/organizations/commands/create-organization.command";
import { OrganizationMapper } from "@app/modules/organizations/mappers/organization.mapper";
import { OrganizationRepository } from "@app/modules/organizations/repositories/organization.repository";
import { DatabaseModule } from "@app/infrastructure/database/database.module";
import { ListOrganizationsQuery } from "@app/modules/organizations/queries/list-organizations.query";

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateOrganizationCommand,
    ListOrganizationsQuery,
    OrganizationMapper,
    OrganizationRepository,
  ],
  controllers: [OrganizationsController],
})
export class OrganizationsModule {}
