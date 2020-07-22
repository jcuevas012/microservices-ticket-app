import { json } from "body-parser"
import express, { Application } from "express"

const app: Application = express()

const PORT = 3000

app.use(json())

app.get(" /api/users/currentuser", (req, res) => {
  res.send("I' am current user")
})

app.listen(PORT, (req, res) => {
  console.log(`Auth service listening in port ${PORT}`)
})
