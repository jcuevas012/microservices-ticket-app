import * as Bull from 'bull'
import { ExpirationCompletePublisher } from '../events/publisher/expiration-complete-publisher'
import natsWrapper from '../nats-wrapper'


interface Payload {
    orderId: string
}



const expirationQueue: Bull.Queue<Payload> = new Bull.default('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
})

expirationQueue.process(async (job) => {
    new ExpirationCompletePublisher(natsWrapper.client).publish({ orderId: job.data.orderId })
})


export { expirationQueue }