import mongoose from 'mongoose'
import {Order, OrderStatus} from './order'



interface TicketAttrs {
    id: string,
    title: string, 
    price: number
}


export interface TicketDoc extends mongoose.Document {
    title: string,
    price: number
    isReserved(): Promise<boolean>
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
    return new Ticket({
        _id: attrs.id,
        price: attrs.price,
        title: attrs.title
    })
}

ticketSchema.methods.isReserved = async function () {
    
    const existingOrder = await Order.findOne({
        ticket: this as TicketDoc,
        status: {
            $in: [
                OrderStatus.Created, 
                OrderStatus.AwaitingPayment, 
                OrderStatus.Complete
            ]
        }
    })

    return !!existingOrder
}


export const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)