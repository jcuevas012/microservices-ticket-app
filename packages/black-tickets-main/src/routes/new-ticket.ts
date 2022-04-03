import express, { Request, Response } from 'express'
import { requestValidator, requireAuth } from '@black-tickets/utils'
import Ticket from '../models/ticket'
import newTicketValidator from '../validators/new-ticket-validator'
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher'
import natsWrapper from '../nats-wrapper'
const router = express.Router()

router.post('/', requireAuth, newTicketValidator, requestValidator, async (req: Request, res: Response) => {
    const { title, price } = req.body
    const { id } = req.currentUser

    const ticket = Ticket.build({ title, price, userId: id })
    await ticket.save()

    new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: id,
    })

    res.status(201).send(ticket)
})

export { router as newTicketRouter }
