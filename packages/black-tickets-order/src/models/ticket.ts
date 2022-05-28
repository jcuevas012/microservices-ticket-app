import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import {Order, OrderStatus} from './order'




interface TicketAttrs {
    id: string;
    title: string; 
    price: number;
}


export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    isReserved(): Promise<boolean>
}


interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
    findByEvent(event: { id: string;  version: number}): Promise<TicketDoc | null>
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


ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket({
        _id: attrs.id,
        price: attrs.price,
        title: attrs.title
    })
}

ticketSchema.statics.findByEvent = (attrs: { id: string; version: number }) => {
    return Ticket.findOne({
        _id: attrs.id,
        version: attrs.version - 1
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