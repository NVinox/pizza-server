import { Router } from "express"
import { DoughController } from "../controllers/Dough.controller.js"

const doughRouter = Router()
const doughController = new DoughController()

doughRouter.get("/", doughController.getAll)

export default doughRouter
