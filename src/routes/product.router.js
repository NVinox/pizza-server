import { Router } from "express"
import { ProductsController } from "../controllers/Products.controller.js"

const productsController = new ProductsController()
const productRouter = Router()

productRouter.post("/", productsController.create)
productRouter.get("/", productsController.getAll)
productRouter.get("/:id", productsController.getAlone)
productRouter.put("/:id", productsController.update)
productRouter.delete("/:id", productsController.delete)

export default productRouter
