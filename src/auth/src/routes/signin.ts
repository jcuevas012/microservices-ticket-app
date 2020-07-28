import { Request, Response, Router } from "express"
import { validationResult } from "express-validator"

import BadRequestError from "../errors/bad-request-error"
import NoFound from "../errors/not-found-error"
import RequestValidationError from "../errors/request-validation-error"
import requestValidator from "../middlewares/request-validator"
import User from "../models/user"
import validator from "../validators/signup-validator"

const router = Router()

router.post(
  "/sigin",
  [...validator],
  requestValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const userFound = await User.findOne({ email })

    if (userFound) {
      throw new NoFound("User email not found")
    }

    res.send("Current User")
  }
)

export { router as signInRouter }
