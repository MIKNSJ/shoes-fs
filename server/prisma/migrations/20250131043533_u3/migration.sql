/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userCartName_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_userTransName_fkey";

-- DropTable
DROP TABLE "CartItem";

-- DropTable
DROP TABLE "OrderItem";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "user_cart_name" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "user_trans_name" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_product_id_key" ON "Cart"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_name_key" ON "Cart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_product_id_key" ON "Transaction"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_name_key" ON "Transaction"("name");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_cart_name_fkey" FOREIGN KEY ("user_cart_name") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_trans_name_fkey" FOREIGN KEY ("user_trans_name") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
