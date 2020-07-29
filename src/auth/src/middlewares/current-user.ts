import { NextFunction, Request, Response } from "express"

import utils from "../utils"

export default function (req: Request, res: Response, next: NextFunction) {
  const jwt = req.session?.jwt

  if (!jwt) {
    next()
  }

  try {
    const payload = utils.jwt.verify(jwt)
    req.currentUser = payload
  } catch (error) {}

  next()
}
