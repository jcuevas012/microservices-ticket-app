import { Subjects, Publisher, ExpirationCompleteEvent } from '@black-tickets/utils'


export class ExpirationCompletePublisher  extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.EXPIRATION_COMPLETED = Subjects.EXPIRATION_COMPLETED;;
}