import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { PrismaClient } from "@prisma/client"

export class CategoriesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  getAll = async (req, res, next) => {
    try {
      const categories = await this._prisma.category.findMany({
        orderBy: { id: "asc" },
      })

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Categories list", categories))
    } catch (error) {
      return next(ApiError.internal())
    }
  }

  create = async (req, res, next) => {
    try {
      const categoryTitle = req.body.text

      if (!categoryTitle) {
        return next(new ApiError(400, "Filed 'text' is required"))
      }

      const category = await this._prisma.category.create({
        data: {
          text: categoryTitle,
        },
      })

      return res
        .status(201)
        .json(
          new HttpResponse(
            "CREATED",
            "CREATED",
            "Category is created",
            category
          )
        )
    } catch (error) {
      return next(ApiError.internal())
    }
  }

  update = async (req, res, next) => {
    try {
      const categoryTitle = req.body.text
      const categoryId = +req.body.id
      const findedCategory = await this._prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      })

      if (!findedCategory) {
        return next(
          new ApiError(400, `Category 'id = ${categoryId}' does not exist`)
        )
      }

      if (!categoryId) {
        return next(new ApiError(400, "Filed 'id' is required"))
      }

      if (!categoryTitle) {
        return next(new ApiError(400, "Filed 'text' is required"))
      }

      const updatedCategory = await this._prisma.category.update({
        data: {
          text: categoryTitle,
        },
        where: {
          id: categoryId,
        },
      })

      return res
        .status(200)
        .json(
          new HttpResponse("OK", "OK", "Category is updated", updatedCategory)
        )
    } catch (error) {
      return next(ApiError.internal())
    }
  }
}
