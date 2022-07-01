import { Listener, Subjects,  QUEUE_GROUP, PaymentCreatedEvent, NotFoundError, OrderStatus } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import { Order } from '../../models/order'

export class PaymentCreatedListener extends  Listener<PaymentCreatedEvent>{
    subject: Subjects.PAYMENT_CREATED = Subjects.PAYMENT_CREATED;
    groupQueueName= QUEUE_GROUP.PAYMENT;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const { orderId  } = data

        const order = await Order.findById(orderId)

        if (!order) {
            throw new NotFoundError('Charged order not found')
        }

        order.set({
            status: OrderStatus.Completed
        })

        await order.save()

        msg.ack()
    }

}