export * from './order.status';
import {OrderStatus} from './order.status';
import {Subjects} from './subjects';

interface Ticket {
  id: string;
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}

interface Order {
  id: string;
  status: OrderStatus;
  expiredAt: string;
  userId: string;
  version: number;
  ticket: {
    id: string;
    price: number;
    version: number;
  };
}

export interface ExpirationCompleteEvent {
  subject: Subjects.EXPIRATION_COMPLETED;
  data: {
    orderId: string;
  };
}

export interface OrderCreatedEvent {
  subject: Subjects.ORDER_CREATED;
  data: Order;
}

export interface OrderCancelledEvent {
  subject: Subjects.ORDER_CANCELLED;
  data: {
    id: string;
    ticketId: string;
    version: number;
  };
}

export interface PaymentCreatedEvent {
  subject: Subjects.PAYMENT_CREATED;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}

export interface TicketCreatedEvent {
  subject: Subjects.TICKET_CREATED;
  data: Ticket;
}

export interface TicketUpdatedEvent {
  subject: Subjects.TICKET_UPDATED;
  data: Ticket;
}

export interface Event {
  subject: Subjects;
  data: any;
}

export {Subjects};
