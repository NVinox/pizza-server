export class ApiError extends Error {
  constructor(status, message) {
    super()

    this.status = status
    this.message = message
  }

  static badRequest(message = "Request failed") {
    return new ApiError(400, message)
  }

  static notFound(message = "API not found") {
    return new ApiError(404, message)
  }

  static internal() {
    return new ApiError(500, "Internal Server Error")
  }
}
