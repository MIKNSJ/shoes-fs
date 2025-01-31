/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_product_id_key" ON "CartItem"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_product_id_key" ON "OrderItem"("product_id");
