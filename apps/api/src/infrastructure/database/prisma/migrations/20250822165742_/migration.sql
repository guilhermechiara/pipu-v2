/*
  Warnings:

  - You are about to drop the column `employeeId` on the `employee_hierarchy_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `employee_hierarchy_nodes` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `employee_hierarchy_nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `employee_hierarchy_nodes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."employee_hierarchy_nodes" DROP CONSTRAINT "employee_hierarchy_nodes_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."employee_hierarchy_nodes" DROP CONSTRAINT "employee_hierarchy_nodes_organizationId_fkey";

-- AlterTable
ALTER TABLE "public"."employee_hierarchy_nodes" DROP COLUMN "employeeId",
DROP COLUMN "organizationId",
ADD COLUMN     "employee_id" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permission_scopes" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permission_scopes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PermissionToPermissionScope" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermissionToPermissionScope_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_id_key" ON "public"."permissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_scopes_id_key" ON "public"."permission_scopes"("id");

-- CreateIndex
CREATE INDEX "_PermissionToPermissionScope_B_index" ON "public"."_PermissionToPermissionScope"("B");

-- AddForeignKey
ALTER TABLE "public"."employee_hierarchy_nodes" ADD CONSTRAINT "employee_hierarchy_nodes_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_hierarchy_nodes" ADD CONSTRAINT "employee_hierarchy_nodes_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToPermissionScope" ADD CONSTRAINT "_PermissionToPermissionScope_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PermissionToPermissionScope" ADD CONSTRAINT "_PermissionToPermissionScope_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."permission_scopes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
