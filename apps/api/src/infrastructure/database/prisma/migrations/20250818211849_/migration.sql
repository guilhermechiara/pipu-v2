/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."organizations" ADD COLUMN     "externalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_externalId_key" ON "public"."organizations"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "users_external_id_key" ON "public"."users"("external_id");
