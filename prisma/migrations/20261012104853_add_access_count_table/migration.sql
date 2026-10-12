/*
  Warnings:

  - You are about to drop the column `accessCount` on the `shorten_urls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shorten_urls" DROP COLUMN "accessCount";

-- CreateTable
CREATE TABLE "AccessCount" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "url_id" TEXT NOT NULL,

    CONSTRAINT "AccessCount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccessCount" ADD CONSTRAINT "AccessCount_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "shorten_urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
