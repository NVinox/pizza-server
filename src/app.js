import express from "express"
import fileUpload from "express-fileupload"

import cors from "cors"
import { config } from "dotenv"

import { errorHandlerMiddleware } from "./middleware/index.middleware.js"

import routes from "./routes/index.router.js"

config()

export class App {
  #_port
  #_app

  constructor() {
    this.#_port = process.env.SERVER_PORT || 4000
    this.#_app = express()

    this.#_middleware()
    this.#_routes()
  }

  listen() {
    this.#_app.listen(this.#_port)
    console.log(`Server is started on port: ${this.#_port}`)
  }

  #_middleware() {
    this.#_app.use(cors({ origin: "*" }))
    this.#_app.use(express.static("assets"))
    this.#_app.use(fileUpload({}))
    this.#_app.use(express.json())
  }

  #_routes() {
    this.#_app.use("/api/v1", routes)
    this.#_app.use(errorHandlerMiddleware)
  }
}
