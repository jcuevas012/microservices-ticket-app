import { Publisher,  Subjects, OrderCreatedEvent } from "@black-tickets/utils"


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {

     subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;

}