import { Router } from "express"
import { ProductsController } from "../controllers/Products.controller.js"

const productsController = new ProductsController()
const productRouter = Router()

productRouter.post("/", productsController.create)
productRouter.get("/", productsController.getAll)
productRouter.get("/:id", productsController.getAlone)

export default productRouter
