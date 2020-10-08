import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'

import NotFound from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from './routes'

const app: Application = express()

app.set('trust proxy', 1) // trust first proxy

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV != 'test',
    }),
)

app.use('/api/users', currentUserRouter)
app.use('/api/users', signInRouter)
app.use('/api/users', signUpRouter)
app.use('/api/users', signOutRouter)

app.all('*', () => {
    throw new NotFound()
})

app.use(errorHandler)

export { app }
