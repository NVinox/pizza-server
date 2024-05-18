import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient } from "@prisma/client"

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
    } catch {
      return next(ApiError.internal())
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
    } catch {
      return next(ApiError.internal())
    }
  }
}
