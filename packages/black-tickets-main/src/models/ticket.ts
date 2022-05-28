import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
// ticket attributes build

interface TicketAttrs {
    title: string
    price: number
    userId: string
}

// Note: An interface that describes the properties that user model has,
// add build function to model to restrict params in user creation
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
}

// Note: An interface that describes the properties that User document has,
// value return from mongoose operations
interface TicketDoc extends mongoose.Document {
    title: string
    price: number
    userId: string
    version: number
    orderId?: number 
}

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
        },
    },
    {
        versionKey: false,
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    },
)


ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

//Note: add custom build function to user schema in order to be access in User mongoose model
ticketSchema.statics.build = (userAttrs: TicketAttrs) => {
    return new Ticket(userAttrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export default Ticket
