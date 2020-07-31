import { Request, Response, Router } from "express"

const router = Router()

router.post("/signout", async (req: Request, res: Response) => {
  req.session = null
  res.status(200).send({})
})

export { router as signOutRouter }
