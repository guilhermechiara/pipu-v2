/*
  Warnings:

  - You are about to drop the column `externalId` on the `organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_id]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `external_id` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."organizations_externalId_key";

-- AlterTable
ALTER TABLE "public"."organizations" DROP COLUMN "externalId",
ADD COLUMN     "external_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_external_id_key" ON "public"."organizations"("external_id");
