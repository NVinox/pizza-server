import { Router } from "express"
import { DoughController } from "../controllers/Dough.controller.js"

const doughRouter = Router()
const doughController = new DoughController()

doughRouter.post("/", doughController.create)
doughRouter.get("/", doughController.getAll)

export default doughRouter
