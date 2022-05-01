import mongoose from 'mongoose'


interface OrderAttrs {
    userId: string;
    status: string;
    expiredAt: string;
    ticket: string
}


interface OrderDoc extends mongoose.Document {
    userId: string;
    status: string;
    expiredAt: string;
    ticket: string
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