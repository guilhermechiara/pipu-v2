/*
  Warnings:

  - Added the required column `organizationId` to the `employee_hierarchy_nodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."employee_hierarchy_nodes" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."employee_hierarchy_nodes" ADD CONSTRAINT "employee_hierarchy_nodes_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
