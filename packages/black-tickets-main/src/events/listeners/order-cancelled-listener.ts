import { Listener, NotFoundError, OrderCancelledEvent, QUEUE_GROUP, Subjects } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import Ticket from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCancelledEvent> {
    groupQueueName: string = QUEUE_GROUP.TICKET;

    subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const { ticketId, id } = data

        const ticketFound = await Ticket.findOne({ id: ticketId, orderId: id})

        if (!ticketFound) {
            throw new NotFoundError('Not ticket found to reserve')
        }
        
        ticketFound.set({ orderId: undefined })

        await ticketFound.save()

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticketFound.id,
            version: ticketFound.version,
            price: ticketFound.price,
            title: ticketFound.title,
            userId: ticketFound.userId,
            orderId: ticketFound.orderId
        })

        msg.ack()
        
    }

}