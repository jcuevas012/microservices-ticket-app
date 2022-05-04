import { NotAuthorizedError, NotFoundError, requireAuth } from '@black-tickets/utils';
import express, { Request, Response } from 'express'
import { Order, OrderStatus } from '../models/order';

const router = express.Router()

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.currentUser.id

    const order = await Order.findById(id)

    if (!order) {
        throw new NotFoundError('Not found order with provided id')
    }

    if (order.userId !== userId) {
        throw new NotAuthorizedError()
    }

    order.status = OrderStatus.Cancelled

    await order.save()

    res.status(204).send()
})

export { router as deleteOrder }
