import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

export class ProductTypesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  getAll = async (req, res, next) => {
    try {
      const productTypes = await this._prisma.productType.findMany({
        orderBy: { id: "asc" },
      })

      if (!productTypes.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Product types list is empty",
              productTypes
            )
          )
      }

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Product types list", productTypes))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }
}
