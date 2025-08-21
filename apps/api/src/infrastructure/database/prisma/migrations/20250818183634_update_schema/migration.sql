/*
  Warnings:

  - You are about to drop the column `firstName` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financial_contact` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legal_name` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trading_name` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."organizations_document_key";

-- AlterTable
ALTER TABLE "public"."employees" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."organizations" DROP COLUMN "name",
ADD COLUMN     "document_type" TEXT NOT NULL,
ADD COLUMN     "financial_contact" TEXT NOT NULL,
ADD COLUMN     "legal_name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "trading_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employees" ADD CONSTRAINT "employees_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
