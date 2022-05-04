import { requireAuth } from '@black-tickets/utils'
import express, { Request, Response } from 'express'
import { Order } from '../models/order'

const router = express.Router()

router.get('/', requireAuth, async (req: Request, res: Response) => {

    const userId = req.currentUser.id

    const orders = await Order.find({
        userId
    }).populate('ticket')


    res.status(200).send(orders)
})

export { router as getOrders }
