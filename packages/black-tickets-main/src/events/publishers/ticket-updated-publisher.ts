import {Publisher, Subjects, TicketUpdatedEvent} from '@black-tickets/utils';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED;
}
