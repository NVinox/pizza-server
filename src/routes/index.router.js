import { Router } from "express"

import categoriesRouter from "./categories.router.js"
import sortCategoriesRouter from "./sortCategories.router.js"
import doughRouter from "./dough.router.js"

const router = Router()

router.use("/categories", categoriesRouter)
router.use("/sort-categories", sortCategoriesRouter)
router.use("/dough", doughRouter)

export default router
