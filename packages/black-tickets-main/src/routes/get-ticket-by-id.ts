import { NotFoundError, requireAuth } from '@black-tickets/utils'
import express, { Request, Response } from 'express'
import Ticket from '../models/ticket'

const router = express.Router()

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params
    const ticket = await Ticket.findById(id)

    if (!ticket) {
        throw new NotFoundError(`Not ticket found with id ${id}`)
    }

    res.status(200).send(ticket)
})

export { router as getTicketById }
