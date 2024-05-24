/*
  Warnings:

  - You are about to drop the `Dough` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `size` to the `ProductSize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caption` to the `ProductType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductSize" ADD COLUMN     "selectable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductType" ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "selectable" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Dough";

-- DropTable
DROP TABLE "Size";
