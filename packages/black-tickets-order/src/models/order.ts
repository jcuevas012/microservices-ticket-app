import { OrderStatus } from '@black-tickets/utils';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import mongoose from 'mongoose'
import { TicketDoc } from './ticket';


export { OrderStatus }

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
    ticket: TicketDoc;
    version: number
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


orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs)
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export  { Order }