export class HttpResponse {
  constructor(statusCode, httpStatus, message, data) {
    this.statusCode = this.#_getStatusCode(statusCode)
    this.httpStatus = this.#_getHttpStatus(httpStatus)
    this.message = message
    this.data = data || null
  }

  #_getStatusCode(statusCode) {
    const statusCodes = {
      OK: 200,
      CREATED: 201,
    }

    return statusCodes[statusCode]
  }

  #_getHttpStatus(httpStatus) {
    const statusCodes = {
      OK: "OK",
      CREATED: "CREATED",
    }

    return statusCodes[httpStatus]
  }
}
