import { HttpResponse } from "../domain/index.domain.js"
import { ApiError } from "../error/index.error.js"

export class CategoriesController {
  async getCategories(req, res, next) {
    try {
      return res.status(200).json(
        new HttpResponse("OK", "OK", "Categories list", {
          message: "Коллекция категорий",
        })
      )
    } catch (error) {
      return next(ApiError.internal())
    }
  }
}
