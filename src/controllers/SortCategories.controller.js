import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { PrismaClient } from "@prisma/client"

export class SortCategoriesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  create = async (req, res, next) => {
    try {
      const categoryTitle = req.body.text

      if (!categoryTitle) {
        return next(ApiError.badRequest("Filed 'text' is required"))
      }

      const sortCategory = await this._prisma.sortCategory.create({
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
            "Sort category is created",
            sortCategory
          )
        )
    } catch (e) {
      return next(ApiError.internal())
    }
  }

  getAll = async (req, res, next) => {
    try {
      const sortCategories = await this._prisma.sortCategory.findMany({
        orderBy: { id: "asc" },
      })

      if (!sortCategories.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Sort categories list is empty",
              sortCategories
            )
          )
      }

      return res
        .status(200)
        .json(
          new HttpResponse("OK", "OK", "Sort categories list", sortCategories)
        )
    } catch (error) {
      return next(ApiError.internal())
    }
  }

  update = async (req, res, next) => {
    try {
      const sortCategoryTitle = req.body.text
      const sortCategoryId = +req.body.id
      const foundSortCategory = await this._prisma.sortCategory.findUnique({
        where: {
          id: sortCategoryId,
        },
      })

      if (!foundSortCategory) {
        return next(
          ApiError.notFound(
            `Sort category 'id = ${sortCategoryId}' does not exist`
          )
        )
      }

      if (!sortCategoryTitle) {
        return next(ApiError.notFound("Filed 'text' is required"))
      }

      const updatedSortCategory = await this._prisma.sortCategory.update({
        where: {
          id: sortCategoryId,
        },
        data: {
          text: sortCategoryTitle,
        },
      })

      return res
        .status(200)
        .json(
          new HttpResponse(
            "OK",
            "OK",
            "Sort category is updated",
            updatedSortCategory
          )
        )
    } catch {
      return next(ApiError.internal())
    }
  }
}
