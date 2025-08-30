-- AlterTable
ALTER TABLE "public"."employees" ADD COLUMN     "current_leader_id" TEXT,
ADD COLUMN     "current_people_partner_id" TEXT;

-- CreateTable
CREATE TABLE "public"."organization_hierarchy_nodes" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_hierarchy_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_hierarchy_nodes_id_key" ON "public"."organization_hierarchy_nodes"("id");

-- AddForeignKey
ALTER TABLE "public"."employees" ADD CONSTRAINT "employees_current_leader_id_fkey" FOREIGN KEY ("current_leader_id") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employees" ADD CONSTRAINT "employees_current_people_partner_id_fkey" FOREIGN KEY ("current_people_partner_id") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."organization_hierarchy_nodes" ADD CONSTRAINT "organization_hierarchy_nodes_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
