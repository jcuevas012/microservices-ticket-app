import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import natsWrapper from './nats-wrapper'

import { currentUser, errorHandler, NotFoundError } from '@black-tickets/utils'
import {  getOrder } from './routes'
import { OrderCreatedListener } from './events/listeners/order-created-listener'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener'

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

app.get('/api/payments/health', (_req, res) => {
    res.status(200).send({ success: true })
})

app.use(currentUser)
app.use('/api/payments', getOrder)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
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


        new OrderCreatedListener(natsWrapper.client).listen()
        new OrderCancelledListener(natsWrapper.client).listen()

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
        console.log(`Payment service listening in port ${PORT}`)
        console.log(`======================================`)
    })
}

start()
