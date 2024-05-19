import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

export class ProductTypesController {
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

      const productType = await this._prisma.productType.create({
        data: {
          productId: req.body.productId,
          additionalPrice: req.body.additionalPrice,
        },
      })

      return res
        .status(201)
        .json(
          new HttpResponse("OK", "OK", "Product type is created", productType)
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

  update = async (req, res, next) => {
    try {
      const id = Number(req.params.id)

      if (isNaN(id)) {
        return next(ApiError.badRequest("Parameter 'id' must be a number"))
      }

      const updatedProductType = await this._prisma.productType.update({
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
            "Product type is updated",
            updatedProductType
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
