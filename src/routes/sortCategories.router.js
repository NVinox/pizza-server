import { Router } from "express"

import { SortCategoriesController } from "../controllers/SortCategories.controller.js"

const sortCategoriesRouter = Router()
const sortCategoriesController = new SortCategoriesController()

sortCategoriesRouter.post("/", sortCategoriesController.create)
sortCategoriesRouter.get("/", sortCategoriesController.getAll)

export default sortCategoriesRouter
