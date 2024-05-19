import { Files } from "../services/Files.service.js"

import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"

import { getEmptyFields } from "../helpers/index.helper.js"
import { PrismaClient, Prisma } from "@prisma/client"

export class ProductsController {
  _prisma
  _filesService

  constructor() {
    this._prisma = new PrismaClient()
    this._filesService = new Files()
  }

  create = async (req, res, next) => {
    try {
      if (req.files) {
        const image = this._filesService.saveFile(req.files.image)
        const raiting = req.body.raiting ? +req.body.raiting : null
        const body = {
          title: req.body.title,
          description: req.body.description,
          image,
          raiting,
          basePrice: +req.body.basePrice,
        }
        const emptyFields = getEmptyFields(body)

        if (emptyFields) {
          return next(
            ApiError.badRequest(`Fields '${emptyFields}' is required`)
          )
        }
        const product = await this._prisma.product.create({ data: body })

        return res
          .status(201)
          .json(new HttpResponse("OK", "OK", "Products list", product))
      }

      return next(ApiError.badRequest(`Fields 'image' is required`))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  getAll = async (req, res, next) => {
    try {
      const products = await this._prisma.product.findMany({
        orderBy: { id: "asc" },
        include: { categories: true, sizes: true, types: true },
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
