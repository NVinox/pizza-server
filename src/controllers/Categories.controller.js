import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { PrismaClient } from "@prisma/client"

export class CategoriesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  getCategories = async (req, res, next) => {
    try {
      const categories = await this._prisma.category.findMany()

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Categories list", categories))
    } catch (error) {
      return next(ApiError.internal())
    }
  }
}
