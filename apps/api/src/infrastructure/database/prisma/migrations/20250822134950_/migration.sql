/*
  Warnings:

  - Added the required column `type` to the `employee_hierarchy_nodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."employee_hierarchy_nodes" ADD COLUMN     "type" TEXT NOT NULL;
