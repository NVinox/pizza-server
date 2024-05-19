import { Router } from "express"
import { SizesController } from "../controllers/Sizes.controller.js"

const sizeController = new SizesController()
const sizeRouter = Router()

sizeRouter.post("/", sizeController.create)
sizeRouter.get("/", sizeController.getAll)
sizeRouter.put("/", sizeController.update)
sizeRouter.delete("/", sizeController.delete)

export default sizeRouter
