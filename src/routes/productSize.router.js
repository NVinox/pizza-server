import { Router } from "express"
import { ProductSizesController } from "../controllers/ProductSizes.controller.js"

const productSizeRouter = Router()
const productSizesController = new ProductSizesController()

productSizeRouter.post("/", productSizesController.create)
productSizeRouter.get("/", productSizesController.getAll)
productSizeRouter.put("/:id", productSizesController.update)
productSizeRouter.delete("/:id", productSizesController.delete)

export default productSizeRouter
