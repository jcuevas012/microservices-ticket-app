import { Listener, OrderCreatedEvent, QUEUE_GROUP, Subjects } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    groupQueueName: string = QUEUE_GROUP.PAYMENT;

    subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

        const order = Order.build({
            id: data.id,
            status: data.status,
            price: data.ticket.price,
            userId: data.userId,
            version: data.version
        })

        await order.save()

        msg.ack()
        
    }

}