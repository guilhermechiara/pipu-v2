/*
  Warnings:

  - Added the required column `status` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."employees" ADD COLUMN     "status" TEXT NOT NULL;
