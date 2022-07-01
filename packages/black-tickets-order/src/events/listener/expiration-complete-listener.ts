import { Listener, Subjects, ExpirationCompleteEvent, QUEUE_GROUP, NotFoundError, OrderStatus } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListner extends  Listener<ExpirationCompleteEvent>{
    subject: Subjects.EXPIRATION_COMPLETED = Subjects.EXPIRATION_COMPLETED;
    groupQueueName= QUEUE_GROUP.EXPIRATION;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const { orderId } = data
 
        const order = await Order.findById(orderId)

        if (!order) {
            throw new NotFoundError('Not found order')
        }


        if (order.status === OrderStatus.Completed) {
            msg.ack()            
        }

        order.set({
            status: OrderStatus.Cancelled,
        })
        
        await order.save()


        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            ticketId: order.ticket.id,
            version: order.version,
        })

        msg.ack()
    }

}