import { Router } from "express"
import { ProductTypesController } from "../controllers/ProductTypes.controller.js"

const productController = new ProductTypesController()
const productTypeRouter = Router()

productTypeRouter.use("/", productController.getAll)

export default productTypeRouter
