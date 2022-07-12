import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'

import { NotFoundError, errorHandler } from '@black-tickets/utils'
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from './routes'

const app: Application = express()

app.set('trust proxy', 1) // trust first proxy

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: false,
    }),
)

app.use('/api/users', currentUserRouter)
app.use('/api/users', signInRouter)
app.use('/api/users', signUpRouter)
app.use('/api/users', signOutRouter)

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
