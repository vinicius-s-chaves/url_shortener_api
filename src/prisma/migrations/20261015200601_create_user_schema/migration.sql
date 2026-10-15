/*
  Warnings:

  - Added the required column `user_id` to the `shorten_urls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shorten_urls" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shorten_urls" ADD CONSTRAINT "shorten_urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
