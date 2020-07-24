import CustomError from "./custom-error"

export default class NoFound extends CustomError {
  statusCode: number = 500

  constructor(public message: string = "Not Found") {
    super("Not Found")

    Object.setPrototypeOf(this, NoFound.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
