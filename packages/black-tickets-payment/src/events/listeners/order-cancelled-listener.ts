import { Listener, NotFoundError, OrderCancelledEvent, QUEUE_GROUP, Subjects, OrderStatus } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    groupQueueName: string = QUEUE_GROUP.PAYMENT;

    subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {

        const order = await Order.findOne({
            id: data.id,
            version: data.version
        })

        if (!order) {
            throw new NotFoundError('Not found order to cancel in payment services')
        }
        
        
        order.set({
            status: OrderStatus.Cancelled
        })

        await order.save()

        msg.ack()
        
    }

}