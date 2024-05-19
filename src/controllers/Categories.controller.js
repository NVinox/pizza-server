import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

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

      if (!categories.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Sort categories list is empty",
              categories
            )
          )
      }

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Categories list", categories))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
    }
  }

  create = async (req, res, next) => {
    try {
      const categoryTitle = req.body.text
      const emptyFields = getEmptyFields({ text: categoryTitle })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
    }
  }

  update = async (req, res, next) => {
    try {
      const categoryTitle = req.body.text
      const categoryId = +req.body.id
      const emptyFields = getEmptyFields({ text: categoryTitle })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
    }
  }

  delete = async (req, res, next) => {
    try {
      const categoryId = +req.body.id
      const emptyFields = getEmptyFields({ id: categoryId })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const deletedCategory = await this._prisma.category.delete({
        where: {
          id: categoryId,
        },
      })

      return res
        .status(200)
        .json(
          new HttpResponse("OK", "OK", "Category is deleted", deletedCategory)
        )
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.badRequest(error))
    }
  }
}
