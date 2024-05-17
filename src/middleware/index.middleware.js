import { ApiError } from "../error/index.error.js"

export function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }

  return res.status(500).json({ message: "Internal Server Error" })
}
