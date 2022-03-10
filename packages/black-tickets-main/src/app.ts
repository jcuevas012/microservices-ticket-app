import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'

import { NotFoundError, errorHandler } from '@black-tickets/utils'

const app: Application = express()

app.set('trust proxy', 1) // trust first proxy

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV != 'test',
    }),
)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
