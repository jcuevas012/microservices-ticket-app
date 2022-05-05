import { Publisher, OrderCancelledEvent, Subjects } from "@black-tickets/utils"


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {

     subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;

}