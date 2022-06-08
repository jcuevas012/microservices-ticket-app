import { OrderStatus } from '@black-tickets/utils';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import mongoose from 'mongoose'


export { OrderStatus }

interface OrderAttrs {
    id: string;
    userId: string;
    version: number;
    status: OrderStatus;
    price: number;
}

interface OrderDoc extends mongoose.Document {
    id: string;
    userId: string;
    version: number;
    status: OrderStatus;
    price: number;
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
    },
    price: {
        type: Number,
        required: true,
    },
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