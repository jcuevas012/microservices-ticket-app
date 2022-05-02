import mongoose from 'mongoose'


interface TicketAttrs {
    title: string, 
    price: number
}


export interface TicketDoc extends mongoose.Document {
    title: string,
    price: number
}


interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true,
        min: true
    }
},
{
    toJSON: {
        transform(_doc, ref) {
            ref.id = ref._id
            delete ref._id
        }
    }
})


ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs)
}

export const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)