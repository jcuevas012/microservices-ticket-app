import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'
import mongoose from 'mongoose'

import { currentUser, errorHandler, NotFoundError } from '@black-tickets/utils'
import { newTicketRouter, getTickets } from './routes'

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

app.get('/api/tickets/health', (_req, res) => {
    res.status(200).send({ success: true })
})

app.use(currentUser)
app.use('/api/tickets', newTicketRouter)
app.use('/api/tickets', getTickets)

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

    try {
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
        console.log(`Main service listening in port ${PORT}`)
        console.log(`======================================`)
    })
}

start()
