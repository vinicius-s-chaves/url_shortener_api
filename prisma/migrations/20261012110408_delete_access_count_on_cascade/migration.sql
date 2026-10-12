-- DropForeignKey
ALTER TABLE "AccessCount" DROP CONSTRAINT "AccessCount_url_id_fkey";

-- AddForeignKey
ALTER TABLE "AccessCount" ADD CONSTRAINT "AccessCount_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "shorten_urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
