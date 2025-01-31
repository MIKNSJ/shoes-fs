/*
  Warnings:

  - You are about to drop the column `userCart` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `userTrans` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `userTransId` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "userCart",
DROP COLUMN "userTrans",
DROP COLUMN "userTransId";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userTransId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_name_key" ON "OrderItem"("name");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userCartId_fkey" FOREIGN KEY ("userCartId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_userTransId_fkey" FOREIGN KEY ("userTransId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
