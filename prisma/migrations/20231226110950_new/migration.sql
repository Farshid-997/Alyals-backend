/*
  Warnings:

  - Added the required column `notificationType` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('promotional', 'normal', 'payment', 'service');

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "notificationType" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;
