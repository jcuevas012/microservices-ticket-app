import express, { Application } from "express"
import "express-async-errors"

import { json } from "body-parser"


import NotFound from "./errors/not-found-error"
import { errorHandler } from "./middlewares/error-handler"
import { currentUserRouter, signInRouter, signUpRouter } from "./routes"

const app: Application = express()

const PORT = 3000

app.use(json())

app.use("/api/users", currentUserRouter)
app.use("/api/users", signInRouter)
app.use("/api/users", signUpRouter)

app.get("*", () => {
  throw new NotFound()
})

app.use(errorHandler)
app.listen(PORT, (req, res) => {
  console.log(`Auth service listening in port ${PORT}`)
})
