import { Listener, Subjects, QUEUE_GROUP, TicketUpdatedEvent, NotFoundError } from "@black-tickets/utils";
import { Message } from "node-nats-streaming";
import { Ticket } from '../../models/ticket'

export class TicketUpdatedListener extends  Listener<TicketUpdatedEvent>{
    subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED;
    groupQueueName= QUEUE_GROUP.ORDERS;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const { title, price, id, version } = data

        const ticket =  await Ticket.findOne({
            _id: id,
            version: version - 1
        })

        if (!ticket) {
            throw new NotFoundError('Ticket not found')
        }

        ticket.set({
            title,
            price
        })

        await ticket.save()

        msg.ack()
    }

}