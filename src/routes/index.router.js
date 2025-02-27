import { Router } from "express"

import categoriesRouter from "./categories.router.js"
import sortCategoriesRouter from "./sortCategories.router.js"
import productRouter from "./product.router.js"
import productTypeRouter from "./productType.router.js"
import productSizeRouter from "./productSize.router.js"

const router = Router()

router.use("/categories", categoriesRouter)
router.use("/sort-categories", sortCategoriesRouter)
router.use("/products", productRouter)
router.use("/product-types", productTypeRouter)
router.use("/product-sizes", productSizeRouter)

export default router
