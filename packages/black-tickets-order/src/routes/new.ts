import { requestValidator, requireAuth } from '@black-tickets/utils'
import { body } from "express-validator"
import express, { Request, Response } from 'express'
import * as mongoose  from 'mongoose'
// import Ticket from '../models/ticket'

const router = express.Router()

router.post('/', requireAuth, [
    body("ticketId")
    .notEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage("ticket id must be provided"),
], requestValidator, async (_req: Request, res: Response) => {
    res.status(200).send({})
})

export { router as createOrder }
