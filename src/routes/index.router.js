import { Router } from "express"

import categoriesRouter from "./categories.router.js"

const router = Router()

router.use("/categories", categoriesRouter)

export default router
