/*
  Warnings:

  - You are about to drop the `URL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "URL";

-- CreateTable
CREATE TABLE "shorten_urls" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "accessCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shorten_urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shorten_urls_shortCode_key" ON "shorten_urls"("shortCode");
