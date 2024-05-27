import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { Prisma, PrismaClient } from "@prisma/client"

export class SortCategoriesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  create = async (req, res, next) => {
    try {
      const categoryTitle = req.body.text
      const emptyFields = getEmptyFields({ text: categoryTitle })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
    }
  }

  update = async (req, res, next) => {
    try {
      const sortCategoryTitle = req.body.text
      const sortCategoryId = +req.body.id
      const emptyFields = getEmptyFields({ text: sortCategoryTitle })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
    }
  }

  delete = async (req, res, next) => {
    try {
      const sortCategoryId = +req.body.id
      const emptyFields = getEmptyFields({ id: sortCategoryId })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const deletedCategory = await this._prisma.sortCategory.delete({
        where: {
          id: sortCategoryId,
        },
      })

      return res
        .status(200)
        .json(
          new HttpResponse(
            "OK",
            "OK",
            "Sort category is deleted",
            deletedCategory
          )
        )
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
    }
  }
}
