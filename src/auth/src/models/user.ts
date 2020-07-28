import mongoose from "mongoose"

import Password from "../utils/password"

// user attributes build

interface UserAttrs {
  email: string
  password: string
}

// user model define
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// document interface define to return
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hasedPass = await Password.toHash(this.get("password"))
    this.set("password", hasedPass)
  }
})

userSchema.statics.build = (userAttrs: UserAttrs) => {
  return new User(userAttrs)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export default User
