import { HttpResponse } from "../domain/index.domain.js"
import { ApiError as APIError, ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

export class SizesController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  create = async (req, res, next) => {
    try {
      const body = {
        size: req.body.size,
      }
      const emptyFields = getEmptyFields(body)

      if (emptyFields) {
        next(APIError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const size = await this._prisma.size.create({
        data: body,
      })

      return res
        .status(201)
        .json(new HttpResponse("CREATED", "CREATED", "Size is created", size))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  getAll = async (req, res, next) => {
    try {
      const sizes = await this._prisma.size.findMany({
        orderBy: { id: "asc" },
      })

      if (!sizes.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Dough list is empty",
              sizes
            )
          )
      }

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Sizes list", sizes))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  update = async (req, res, next) => {
    try {
      const id = req.body.id
      const size = req.body.size
      const emptyFields = getEmptyFields({ id, size })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const updatedSize = await this._prisma.size.update({
        data: { size },
        where: { id },
      })

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Size is updated", updatedSize))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }
}
