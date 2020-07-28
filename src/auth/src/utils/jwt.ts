import jwt from "jsonwebtoken"

const jwtKey: string = process.env.JWT_KEY

function generateToken(user: { id: string; email: string }) {
  return jwt.sign(user, jwtKey)
}

export default {
  generateToken,
}
