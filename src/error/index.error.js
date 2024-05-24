export class ApiError extends Error {
  constructor(status, message) {
    super()

    this.status = status
    this.message = message
  }

  static throwKnownError(errorCode, meta) {
    const errorCodes = { P2025: 404, P2002: 400, P2003: 404, P2014: 400 }

    if (errorCodes[errorCode]) {
      return new ApiError(errorCodes[errorCode], meta)
    }

    return this.internal()
  }

  static badRequest(message = "Request failed") {
    return new ApiError(400, message)
  }

  static internal() {
    return new ApiError(500, "Internal Server Error")
  }
}
