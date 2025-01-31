/*
  Warnings:

  - You are about to drop the column `userCartId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `userTransId` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `userCartName` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTransName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userCartId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_userTransId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "userCartId",
ADD COLUMN     "userCartName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "userTransId",
ADD COLUMN     "userTransName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userCartName_fkey" FOREIGN KEY ("userCartName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_userTransName_fkey" FOREIGN KEY ("userTransName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
