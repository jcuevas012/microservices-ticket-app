import { NotAuthorizedError, NotFoundError, requireAuth } from '@black-tickets/utils'
import express, { Request, Response } from 'express'
import { Order } from '../models/order'
// import Ticket from '../models/ticket'

const router = express.Router()

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.currentUser.id

    const order = await Order.findById(id)
    .populate('ticket')

    if (!order) {
        throw new NotFoundError('Not found order with provided id')
    }

    if (order.userId !== userId) {
        throw new NotAuthorizedError()
    }

    res.status(200).send(order)
})

export { router as getOrder }
