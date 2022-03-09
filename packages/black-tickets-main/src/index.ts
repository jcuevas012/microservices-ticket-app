import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Application } from 'express'
import mongoose from 'mongoose'

// import NotFound from './errors/not-found-error'
// import { errorHandler } from './middlewares/error-handler'

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
    res.status(200).send({ status: 'ok' })
})

const start = async () => {
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
        console.log(`Tickets service listening in port ${PORT}`)
    })
}

start()
