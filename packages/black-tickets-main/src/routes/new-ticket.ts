import express, { Request, Response } from 'express'
import { requestValidator, requireAuth } from '@black-tickets/utils'
import Ticket from '../models/ticket'
import newTicketValidator from '../validators/new-ticket-validator'

const router = express.Router()

router.post('/', requireAuth, newTicketValidator, requestValidator, async (req: Request, res: Response) => {
    const { title, price } = req.body
    const ticket = Ticket.build({ title, price })
    const newTicket = await ticket.save()

    res.status(201).send(newTicket)
})

export { router as newTicketRouter }
