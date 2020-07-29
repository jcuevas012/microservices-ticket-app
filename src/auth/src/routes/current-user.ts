import { Request, Response, Router } from "express"

import utils from "../utils"

const router = Router()

router.get("/current-user", (req: Request, res: Response) => {
  const jwt = req.session.jwt

  if (!jwt) {
    res.send({ currentUser: null })
  }

  try {
    const payload = utils.jwt.verify(jwt)
    res.send({ currentUserRouter: payload })
  } catch (error) {
    res.send({ currentUser: null })
  }
})

export { router as currentUserRouter }
