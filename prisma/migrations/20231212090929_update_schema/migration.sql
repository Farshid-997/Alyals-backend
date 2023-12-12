/*
  Warnings:

  - You are about to drop the column `serviceId` on the `user_review` table. All the data in the column will be lost.
  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_review" DROP CONSTRAINT "user_review_serviceId_fkey";

-- AlterTable
ALTER TABLE "user_review" DROP COLUMN "serviceId";

-- DropTable
DROP TABLE "booking";

-- DropTable
DROP TABLE "service";
