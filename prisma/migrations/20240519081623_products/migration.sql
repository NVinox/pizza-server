-- CreateTable
CREATE TABLE "ProductSize" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "additionalPrice" INTEGER NOT NULL,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "additionalPrice" INTEGER NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "raiting" INTEGER NOT NULL DEFAULT 1,
    "basePrice" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnProduct" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnProduct_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_image_key" ON "Product"("image");

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProduct" ADD CONSTRAINT "CategoriesOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProduct" ADD CONSTRAINT "CategoriesOnProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
