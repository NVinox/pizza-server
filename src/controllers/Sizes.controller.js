import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

export class SizesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  getAll = async (req, res, next) => {
    try {
      const doughList = await this._prisma.size.findMany({
        orderBy: { id: "asc" },
      })

      if (!doughList.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Dough list is empty",
              doughList
            )
          )
      }

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Dough list", doughList))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }
}
