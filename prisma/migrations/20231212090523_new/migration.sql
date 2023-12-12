/*
  Warnings:

  - You are about to drop the `blog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_authorId_fkey";

-- DropTable
DROP TABLE "blog";

-- CreateTable
CREATE TABLE "orderCounts" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderCounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderCounts" ADD CONSTRAINT "orderCounts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
