import mongoose from "mongoose"

import utils from "../utils"

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        delete ret.password
        ret.id = ret._id
        delete ret._id
      },
    },
    versionKey: false,
  }
)

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hasedPass = await utils.password.toHash(this.get("password"))
    this.set("password", hasedPass)
  }
})

userSchema.statics.build = (userAttrs: UserAttrs) => {
  return new User(userAttrs)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export default User
