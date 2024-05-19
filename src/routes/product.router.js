import { Router } from "express"
import { ProductsController } from "../controllers/Products.controller.js"

const productsController = new ProductsController()
const productRouter = Router()

productRouter.get("/", productsController.getAll)

export default productRouter
