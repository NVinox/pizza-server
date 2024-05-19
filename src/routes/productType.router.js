import { Router } from "express"
import { ProductTypesController } from "../controllers/ProductTypes.controller.js"

const productTypesController = new ProductTypesController()
const productTypeRouter = Router()

productTypeRouter.post("/", productTypesController.create)
productTypeRouter.get("/", productTypesController.getAll)
productTypeRouter.put("/:id", productTypesController.update)
productTypeRouter.delete("/:id", productTypesController.delete)

export default productTypeRouter
