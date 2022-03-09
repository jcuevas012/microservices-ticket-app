import mongoose from 'mongoose'

import utils from '../utils'

// user attributes build

interface UserAttrs {
    email: string
    password: string
}

// Note: An interface that describes the properties that user model has,
// add build function to model to restrict params in user creation
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// Note: An interface that describes the properties that User document has,
// value return from mongoose operations
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
            transform(_doc: any, ret: any) {
                delete ret.password
                ret.id = ret._id
                delete ret._id
            },
        },
        versionKey: false,
    },
)

//Note: add custom build function to user schema in order to be access in User mongoose model
userSchema.statics.build = (userAttrs: UserAttrs) => {
    return new User(userAttrs)
}

userSchema.pre('save', async function (_done) {
    if (this.isModified('password')) {
        const hasedPass = await utils.password.toHash(this.get('password'))
        this.set('password', hasedPass)
    }
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export default User
