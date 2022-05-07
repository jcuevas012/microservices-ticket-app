import { Listener, Subjects, TicketCreatedEvent, QUEUE_GROUP } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import { Ticket } from '../../models/ticket'

export class TicketCreatedListener extends  Listener<TicketCreatedEvent>{
    subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
    groupQueueName= QUEUE_GROUP.ORDERS;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { title, price, id } = data

        const ticket = Ticket.build({
            price,
            title,
            id
        })
        await ticket.save()

        msg.ack()
    }

}