import { NotAuthorizedError, NotFoundError, requireAuth } from '@black-tickets/utils';
import express, { Request, Response } from 'express'
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher'
import natsWrapper from '../nats-wrapper';

const router = express.Router()

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.currentUser.id

    const order = await Order.findById(id).populate('ticket')

    if (!order) {
        throw new NotFoundError('Not found order with provided id')
    }

    if (order.userId !== userId) {
        throw new NotAuthorizedError()
    }

    order.status = OrderStatus.Cancelled

    await order.save()

    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticketId: order.ticket.id,
        version: order.version
    })

    res.status(204).send()
})

export { router as deleteOrder }
