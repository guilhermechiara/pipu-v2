/*
  Warnings:

  - You are about to drop the `organization_hierarchy_nodes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."organization_hierarchy_nodes" DROP CONSTRAINT "organization_hierarchy_nodes_employeeId_fkey";

-- DropTable
DROP TABLE "public"."organization_hierarchy_nodes";

-- CreateTable
CREATE TABLE "public"."employee_hierarchy_nodes" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_hierarchy_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_hierarchy_nodes_id_key" ON "public"."employee_hierarchy_nodes"("id");

-- AddForeignKey
ALTER TABLE "public"."employee_hierarchy_nodes" ADD CONSTRAINT "employee_hierarchy_nodes_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
