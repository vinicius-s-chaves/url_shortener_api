/*
  Warnings:

  - A unique constraint covering the columns `[url_id]` on the table `AccessCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessCount_url_id_key" ON "AccessCount"("url_id");
