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
      const file = req.files

      if (file) {
        const image = this._filesService.saveFile(file.image)
        const raiting = req.body.raiting ? +req.body.raiting : undefined
        const basePrice = req.body.basePrice ? +req.body.basePrice : undefined
        const categories = JSON.parse(req.body.categories).map((id) => ({
          category: {
            connect: {
              id,
            },
          },
        }))
        const body = {
          title: req.body.title,
          description: req.body.description,
          image,
          basePrice,
        }
        const emptyFields = getEmptyFields(body)

        if (emptyFields) {
          return next(
            ApiError.badRequest(`Fields '${emptyFields}' is required`)
          )
        }

        const product = await this._prisma.product.create({
          data: {
            ...body,
            raiting,
            categories: {
              create: categories,
            },
          },
          include: {
            categories: true,
            sizes: { select: { id: true, additionalPrice: true } },
            types: { select: { id: true, additionalPrice: true } },
          },
        })

        product.categories = product.categories.map(
          ({ categoryId }) => categoryId
        )

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
      const productsFetch = await this._prisma.product.findMany({
        orderBy: { id: "asc" },
        include: {
          categories: true,
          sizes: { select: { id: true, additionalPrice: true } },
          types: { select: { id: true, additionalPrice: true } },
        },
      })

      if (!productsFetch.length) {
        return res.status(204).json("")
      }

      const products = productsFetch.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        image: product.image,
        raiting: product.raiting,
        categories: product.categories.map(({ categoryId }) => categoryId),
        sizes: product.sizes,
        types: product.types,
      }))

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

  getAlone = async (req, res, next) => {
    try {
      const productId = Number(req.params.id)

      if (isNaN(productId)) {
        return next(ApiError.badRequest(`Parameter 'id' must be a number`))
      }

      const product = await this._prisma.product.findUnique({
        where: { id: productId },
        include: {
          categories: true,
          sizes: { select: { id: true, additionalPrice: true } },
          types: { select: { id: true, additionalPrice: true } },
        },
      })

      if (!product) {
        return res.status(204).json("")
      }

      product.categories = product.categories.map(
        ({ categoryId }) => categoryId
      )

      return res
        .status(200)
        .json(new HttpResponse("OK", "OK", "Product details", product))
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }

  update = async (req, res, next) => {
    try {
      const file = req.files

      if (file) {
        const id = Number(req.params.id)

        if (isNaN(id)) {
          return next(ApiError.badRequest("Parameter 'id' must be a number"))
        }

        const image = file ? this._filesService.saveFile(file.image) : undefined
        const raiting = req.body.raiting ? +req.body.raiting : undefined
        const basePrice = req.files.basePrice ? +req.files.basePrice : undefined
        const body = {
          id,
          title: req.body.title,
          description: req.body.description,
          image,
        }
        const categories = JSON.parse(req.body.categories).map((id) => ({
          category: {
            connect: {
              id,
            },
          },
        }))

        await this._prisma.categoriesOnProduct.deleteMany({
          where: {
            productId: id,
          },
        })

        const product = await this._prisma.product.update({
          where: { id },
          data: {
            ...body,
            raiting,
            basePrice,
            categories: {
              create: categories,
            },
          },
          include: {
            categories: true,
            sizes: { select: { id: true, additionalPrice: true } },
            types: { select: { id: true, additionalPrice: true } },
          },
        })

        product.categories = product.categories.map(
          ({ categoryId }) => categoryId
        )

        return res
          .status(200)
          .json(new HttpResponse("OK", "OK", "Product is updated", product))
      }

      return next(ApiError.badRequest("Field 'image' does not exist"))
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

      await this._prisma.categoriesOnProduct.deleteMany({
        where: {
          productId: id,
        },
      })
      await this._prisma.productType.deleteMany({
        where: {
          productId: id,
        },
      })
      await this._prisma.productSize.deleteMany({
        where: {
          productId: id,
        },
      })

      const deletedProduct = await this._prisma.product.delete({
        where: { id },
        include: {
          categories: true,
          sizes: { select: { id: true, additionalPrice: true } },
          types: { select: { id: true, additionalPrice: true } },
        },
      })

      return res
        .status(200)
        .json(
          new HttpResponse("OK", "OK", "Product is deleted", deletedProduct)
        )
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return next(ApiError.throwKnownError(error.code, error.meta))
      }

      return next(ApiError.internal())
    }
  }
}
