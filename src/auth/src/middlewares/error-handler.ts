import { NextFunction, Request, Response } from "express"

import RequestValidationError from "./../errors/request-validation-error"
import { DatabaseConnectionError } from "../errors/database-connection-error"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formatErrors = err.errors.map((err) => ({
      message: err.msg,
      field: err.param,
    }))

    return res.status(400).send({ errors: formatErrors })
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(400).send({ errors: [err.message] })
  }

  res.status(400).send({
    errors: ["Something went wrong"],
  })
}
