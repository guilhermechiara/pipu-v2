-- AlterTable
ALTER TABLE "public"."permissions" ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."permissions" ADD CONSTRAINT "permissions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
