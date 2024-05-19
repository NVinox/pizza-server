import { Router } from "express"
import { ProductTypesController } from "../controllers/ProductTypes.controller.js"

const productController = new ProductTypesController()
const productTypeRouter = Router()

productTypeRouter.post("/", productController.create)
productTypeRouter.get("/", productController.getAll)

export default productTypeRouter
