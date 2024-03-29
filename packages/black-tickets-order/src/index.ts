import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import natsWrapper from './nats-wrapper'

import { currentUser, errorHandler, NotFoundError } from '@black-tickets/utils'
import { createOrder, getOrder, getOrders, deleteOrder } from './routes'
import { TicketCreatedListener } from './events/listener/ticket-created-listener'
import { TicketUpdatedListener } from './events/listener/ticket-updated-listener'
import { ExpirationCompleteListner } from './events/listener/expiration-complete-listener'
import { PaymentCreatedListener } from './events/listener/payment-created-listener'

const app: Application = express()

const PORT = 3000

app.set('trust proxy', 1) // trust first proxy

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true,
    }),
)

app.get('/api/orders/health', (_req, res) => {
    res.status(200).send({ success: true })
})

app.use(currentUser)
app.use('/api/orders', getOrder)
app.use('/api/orders', getOrders)
app.use('/api/orders', createOrder)
app.use('/api/orders', deleteOrder)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
    console.log(`Starting Order service .....`)
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.')
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined in order to connect to db.')
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined.')
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined in order to nats server.')
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error(' NATS_CLIENT_ID must be defined in order to nats server.')
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID, 
            process.env.NATS_CLIENT_ID, 
            process.env.NATS_URL)

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed')
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())

        // event listner
        new ExpirationCompleteListner(natsWrapper.client).listen()
        new PaymentCreatedListener(natsWrapper.client).listen()
        new TicketCreatedListener(natsWrapper.client).listen()
        new TicketUpdatedListener(natsWrapper.client).listen()

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        console.log('Connected to mongodb')
    } catch (err) {
        console.error(err)
    }

    app.listen(PORT, () => {
        console.log(`======================================`)
        console.log(`Order service listening in port ${PORT}`)
        console.log(`======================================>>>`)
    })
}

start()
