-- DropForeignKey
ALTER TABLE "brand" DROP CONSTRAINT "brand_productId_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "brandId" TEXT;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
