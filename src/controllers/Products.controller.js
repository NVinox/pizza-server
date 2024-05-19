import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

export class ProductsController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  getAll = async (req, res, next) => {
    try {
      const products = await this._prisma.product.findMany({
        orderBy: { id: "asc" },
      })

      if (!products.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Products list is empty",
              products
            )
          )
      }

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Products list", products))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }
}
