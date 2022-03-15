import express, { Request, Response } from 'express'
import { NotAuthorizedError, NotFoundError, requestValidator, requireAuth } from '@black-tickets/utils'
import Ticket from '../models/ticket'
import updateTicketValidator from '../validators/update-ticket-validator'

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

    res.status(202).send(ticket)
})

export { router as updateTicket }
