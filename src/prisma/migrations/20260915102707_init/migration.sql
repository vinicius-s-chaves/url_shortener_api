-- CreateTable
CREATE TABLE "URL" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "accessCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortCode_key" ON "URL"("shortCode");
