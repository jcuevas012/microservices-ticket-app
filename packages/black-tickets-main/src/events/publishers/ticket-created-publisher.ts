import {Publisher, Subjects, TicketCreatedEvent} from '@black-tickets/utils';
 
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
}
