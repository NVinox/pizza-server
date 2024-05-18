import { Router } from "express"

import { SortCategoriesController } from "../controllers/SortCategories.controller.js"

const sortCategoriesRouter = Router()
const sortCategoriesController = new SortCategoriesController()

sortCategoriesRouter.post("/", sortCategoriesController.create)
sortCategoriesRouter.get("/", sortCategoriesController.getAll)
sortCategoriesRouter.put("/", sortCategoriesController.update)
sortCategoriesRouter.delete("/", sortCategoriesController.delete)

export default sortCategoriesRouter
