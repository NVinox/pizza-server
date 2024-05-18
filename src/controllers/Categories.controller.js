import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

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
      return next(ApiError.internal())
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
      return next(ApiError.internal())
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

      const foundCategory = await this._prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      })

      if (!foundCategory) {
        return next(
          ApiError.notFound(`Category 'id = ${categoryId}' does not exist`)
        )
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

  delete = async (req, res, next) => {
    try {
      const categoryId = +req.body.id
      const foundCategory = await this._prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      })

      if (!foundCategory) {
        return next(
          ApiError.notFound(`Category 'id = ${categoryId}' does not exist`)
        )
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
      return next(ApiError.internal())
    }
  }
}
