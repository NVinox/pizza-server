import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

export class ProductSizesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  create = async (req, res, next) => {
    try {
      const body = {
        productId: req.body.productId,
        additionalPrice: req.body.additionalPrice,
      }
      const emptyFields = getEmptyFields(body)

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const productSize = await this._prisma.productSize.create({
        data: {
          productId: req.body.productId,
          additionalPrice: req.body.additionalPrice,
        },
      })

      return res
        .status(201)
        .json(
          new HttpResponse("OK", "OK", "Product size is created", productSize)
        )
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  getAll = async (req, res, next) => {
    try {
      const productSizes = await this._prisma.productSize.findMany({
        orderBy: { id: "asc" },
      })

      if (!productSizes.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Product sizes list is empty",
              productSizes
            )
          )
      }

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Product sizes list", productSizes))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  update = async (req, res, next) => {
    try {
      const id = Number(req.params.id)

      if (isNaN(id)) {
        return next(ApiError.badRequest("Parameter 'id' must be a number"))
      }

      const updatedProductSize = await this._prisma.productSize.update({
        where: {
          id,
        },
        data: {
          additionalPrice: req.body.additionalPrice,
        },
      })

      return res
        .status(200)
        .json(
          new HttpResponse(
            "OK",
            "OK",
            "Product size is updated",
            updatedProductSize
          )
        )
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  delete = async (req, res, next) => {
    try {
      const id = Number(req.params.id)

      if (isNaN(id)) {
        return next(ApiError.badRequest("Parameter 'id' must be a number"))
      }

      const deletedProductSize = await this._prisma.productSize.delete({
        where: { id },
      })

      return res
        .status(200)
        .json(
          new HttpResponse(
            "OK",
            "OK",
            "Product size is deleted",
            deletedProductSize
          )
        )
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }
}
