-- CreateTable
CREATE TABLE "Dough" (
    "id" SERIAL NOT NULL,
    "caption" TEXT NOT NULL,

    CONSTRAINT "Dough_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dough_caption_key" ON "Dough"("caption");

-- CreateIndex
CREATE UNIQUE INDEX "Size_size_key" ON "Size"("size");
