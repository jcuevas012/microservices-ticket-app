interface Ticket {
  id: string;
  title: string;
  price: number;
  userId: string;
}

export interface TicketCreatedEvent {
  subject: Subjects.TICKET_CREATED;
  data: Ticket;
}

export interface TicketUpdatedEvent {
  subject: Subjects.TICKET_UPDATED;
  data: Ticket;
}

export enum Subjects {
  TICKET_CREATED = 'ticket:created',
  TICKET_UPDATED = 'ticket:updated',
  ORDER_UPDATED = 'order:updated',
}

export interface Event {
  subject: Subjects;
  data: any;
}
