import { ValidationError } from "express-validator"

export class DatabaseConnectionError extends Error {
  constructor(public message: string = "Error Connecting Database") {
    super()

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}
