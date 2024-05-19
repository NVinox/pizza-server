import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient, Prisma } from "@prisma/client"

export class DoughController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  create = async (req, res, next) => {
    try {
      const body = { caption: req.body.caption }
      const emptyFields = getEmptyFields(body)

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const dough = await this._prisma.dough.create({ data: body })

      return res
        .status(201)
        .json(
          new HttpResponse("CREATED", "CREATED", "Dough type is created", dough)
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
      const doughList = await this._prisma.dough.findMany({
        orderBy: { id: "asc" },
      })

      if (!doughList.length) {
        return res
          .status(204)
          .json(
            new HttpResponse(
              "NO_CONTENT",
              "NO_CONTENT",
              "Dough list is empty",
              doughList
            )
          )
      }

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Dough list", doughList))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  update = async (req, res, next) => {
    try {
      const doughId = +req.body.id
      const doughCaption = req.body.caption
      const emptyFields = getEmptyFields({ caption: doughCaption, id: doughId })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const updatedDough = await this._prisma.dough.update({
        data: { caption: doughCaption },
        where: { id: doughId },
      })

      return res
        .status(200)
        .json(
          new HttpResponse("OK", "OK", "Dough type is updated", updatedDough)
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
      const doughId = +req.body.id
      const emptyFields = getEmptyFields({ id: doughId })

      if (emptyFields) {
        return next(ApiError.badRequest(`Fields '${emptyFields}' is required`))
      }

      const deletedDough = await this._prisma.dough.delete({
        where: { id: doughId },
      })

      return res
        .status(200)
        .json(
          new HttpResponse("OK", "OK", "Dough type is deleted", deletedDough)
        )
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }
}
