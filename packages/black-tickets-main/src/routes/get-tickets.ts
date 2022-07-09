import express, { Request, Response } from 'express'
import Ticket from '../models/ticket'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
    const tickets = await Ticket.find({
        orderId: undefined
    })
    
    res.status(200).send(tickets)
})

export { router as getTickets }
