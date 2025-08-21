/*
  Warnings:

  - You are about to drop the column `provider_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "provider_id",
ADD COLUMN     "external_id" TEXT;
