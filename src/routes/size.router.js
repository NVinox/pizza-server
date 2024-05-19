import { Router } from "express"
import { SizesController } from "../controllers/Sizes.controller.js"

const sizeController = new SizesController()
const sizeRouter = Router()

sizeRouter.get("/", sizeController.getAll)

export default sizeRouter
