import { Request, Response, Router } from "express"
import { validationResult } from "express-validator"

import BadRequestError from "../errors/bad-request-error"
import RequestValidationError from "../errors/request-validation-error"
import User from "../models/user"
import validation from "../validators/signup-validator"

const router = Router()

router.post("/signup", [...validation], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  const { email, password } = req.body

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  const userFound = await User.findOne({ email })

  if (userFound) {
    throw new BadRequestError("Email already exist")
  }

  const user = User.build({
    email,
    password,
  })

  await user.save()

  res.status(201).send(user)
})

export { router as signUpRouter }
