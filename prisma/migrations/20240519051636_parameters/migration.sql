/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `SortCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_text_key" ON "Category"("text");

-- CreateIndex
CREATE UNIQUE INDEX "SortCategory_text_key" ON "SortCategory"("text");
