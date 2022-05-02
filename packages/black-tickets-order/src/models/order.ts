import { OrderStatus } from '@black-tickets/utils';
import mongoose from 'mongoose'
import { TicketDoc } from './ticket';

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiredAt: string;
    ticket: TicketDoc
}
interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiredAt: string;
    ticket: TicketDoc
}
interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiredAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },

    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {
    toJSON: {
        transform(_doc, ret){
            ret.id = ret._id
            delete ret._id
        }
    }
})

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs)
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export default Order