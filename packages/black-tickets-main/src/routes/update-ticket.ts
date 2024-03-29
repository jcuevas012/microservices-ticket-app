import express, { Request, Response } from 'express'
import { NotAuthorizedError, NotFoundError, requestValidator, requireAuth } from '@black-tickets/utils'
import Ticket from '../models/ticket'
import updateTicketValidator from '../validators/update-ticket-validator'
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher'
import natsWrapper from '../nats-wrapper'


const router = express.Router()

router.put('/:id', requireAuth, updateTicketValidator, requestValidator, async (req: Request, res: Response) => {
    const { id } = req.params

    const ticket = await Ticket.findById(id)

    if (!ticket) {
        throw new NotFoundError(`Not ticket found with id: ${id}`)
    }

    if (req.currentUser.id !== ticket.userId) {
        throw new NotAuthorizedError()
    }

    ticket.set(req.body)
    await ticket.save()

    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
    })

    res.status(202).send(ticket)
})

export { router as updateTicket }
