import { Listener, OrderCreatedEvent, QUEUE_GROUP, Subjects } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queue/order-expiration-queue";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    groupQueueName: string = QUEUE_GROUP.EXPIRATION;

    subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

        const delay = new Date(data.expiredAt).getTime() - new Date().getTime()
        console.log(`Order ${data.id} will expire in ${delay}`)

       await expirationQueue.add({ orderId: data.id }, {
           delay
       })

        msg.ack()
        
    }

}