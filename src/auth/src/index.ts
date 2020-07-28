import "express-async-errors"

import { json } from "body-parser"
import express, { Application } from "express"
import mongoose from "mongoose"

import NotFound from "./errors/not-found-error"
import { errorHandler } from "./middlewares/error-handler"
import { currentUserRouter, signInRouter, signUpRouter } from "./routes"

const app: Application = express()

const PORT = 3000

app.use(json())

app.use("/api/users", currentUserRouter)
app.use("/api/users", signInRouter)
app.use("/api/users", signUpRouter)

app.all("*", () => {
  throw new NotFound()
})

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log("Connected to mongodb")
  } catch (err) {
    console.error(err)
  }

  app.listen(PORT, () => {
    console.log(`Auth service listening in port ${PORT}`)
  })
}

start()
