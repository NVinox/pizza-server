import { Router } from "express"

import { CategoriesController } from "../controllers/Categories.controller.js"

const categoriesRouter = Router()
const categoriesController = new CategoriesController()

categoriesRouter.post("/", categoriesController.create)
categoriesRouter.get("/", categoriesController.getAll)
categoriesRouter.put("/", categoriesController.update)
categoriesRouter.delete("/", categoriesController.delete)

export default categoriesRouter
