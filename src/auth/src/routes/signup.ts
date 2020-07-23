import { Request, Response, Router } from "express"
import { validationResult } from "express-validator"

import { DatabaseConnectionError } from "../errors/database-connection-error"
import RequestValidationError from "../errors/request-validation-error"
import validation from "../validators/signup-validator"

const router = Router()

router.post("/signup", [...validation], (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  console.log("Creating user")
  throw new DatabaseConnectionError()

  res.send({})
})

export { router as signUpRouter }
