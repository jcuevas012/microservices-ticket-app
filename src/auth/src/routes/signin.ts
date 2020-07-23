import { Router } from "express"

const router = Router()

router.post("/sigin", (req, res) => {
  res.send("Current User")
})

export { router as signInRouter }
