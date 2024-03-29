import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'

import { NotFoundError, errorHandler, currentUser } from '@black-tickets/utils'
import { newTicketRouter, getTickets, getTicketById } from './routes'

const app: Application = express()

app.set('trust proxy', 1) // trust first proxy

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: false,
    }),
)
app.use(currentUser)
app.use('/api/tickets', newTicketRouter)
app.use('/api/tickets', getTickets)
app.use('/api/tickets', getTicketById)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
