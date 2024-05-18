import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"
import { getEmptyFields } from "../helpers/index.helper.js"

import { PrismaClient } from "@prisma/client"

export class DoughController {
  _prisma

  constructor() {
    this._prisma = new PrismaClient()
  }

  getAll = async (req, res, next) => {
    try {
      const doughList = await this._prisma.dough.findMany({
        orderBy: { id: "desc" },
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
