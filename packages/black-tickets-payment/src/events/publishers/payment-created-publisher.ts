import { PaymentCreatedEvent, Publisher, Subjects } from "@black-tickets/utils";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PAYMENT_CREATED = Subjects.PAYMENT_CREATED;
}