import { Listener, NotFoundError, OrderCreatedEvent, QUEUE_GROUP, Subjects } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import Ticket from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    groupQueueName: string = QUEUE_GROUP.TICKET;

    subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const { ticket, id } = data

        const ticketFound = await Ticket.findById(ticket.id)

        if (!ticketFound) {
            throw new NotFoundError('Not ticket found to reserve')
        }
        
        ticketFound.set({orderId: id})

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