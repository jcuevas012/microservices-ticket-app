import {Message} from 'node-nats-streaming';
import {Subjects, TicketCreatedEvent} from '../types';
import {Listener} from './listener';

export class TicketCreatedLister extends Listener<TicketCreatedEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
  groupQueueName = 'payments-services';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event Data', data.title, 'price', data.price);
    // console.log('message', msg);

    msg.ack();
  }
}
