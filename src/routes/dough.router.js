import { Router } from "express"
import { DoughController } from "../controllers/Dough.controller.js"

const doughRouter = Router()
const doughController = new DoughController()

doughRouter.post("/", doughController.create)
doughRouter.get("/", doughController.getAll)
doughRouter.put("/", doughController.update)
doughRouter.delete("/", doughController.delete)

export default doughRouter
