import { Router } from "express"

import { CategoriesController } from "../controllers/Categories.controller.js"

const categoriesRouter = Router()
const categoriesController = new CategoriesController()

categoriesRouter.get("/", categoriesController.getCategories)

export default categoriesRouter
