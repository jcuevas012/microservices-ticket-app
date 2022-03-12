import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'

import { NotFoundError, errorHandler, currentUser } from '@black-tickets/utils'
import { newTicketRouter, getTickets } from './routes'

const app: Application = express()

app.set('trust proxy', 1) // trust first proxy

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV != 'test',
    }),
)
app.use(currentUser)
app.use('/api/tickets', newTicketRouter)
app.use('/api/tickets', getTickets)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
