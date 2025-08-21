/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizations_document_key" ON "public"."organizations"("document");
