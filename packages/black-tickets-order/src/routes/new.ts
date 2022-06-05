import { BadRequestError, NotFoundError, requestValidator, requireAuth } from '@black-tickets/utils'
import { body } from "express-validator"
import express, { Request, Response } from 'express'
import * as mongoose  from 'mongoose'
import { Ticket } from '../models/ticket'
import {Order, OrderStatus} from '../models/order'
import  { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'
import natsWrapper from '../nats-wrapper'

const router = express.Router()

const EXPIRATION_SECONDS = 15 * 60

router.post('/', requireAuth, [
    body("ticketId")
    .notEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage("ticket id must be provided"),
], requestValidator, async (req: Request, res: Response) => {

    const userId = req.currentUser.id
    const { ticketId } = req.body
    // Find existing ticket to order

    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
        throw new NotFoundError('ticket not found')
    }


    // check if the ticket was reserved in order completed, created or awaiting for payment
    const isReserved = await ticket.isReserved()

    if (isReserved) {
        throw new BadRequestError('ticket is already booked/reserved')
    }

    // Get expiration time for the created order
    
    const expirationTime = new Date()
    expirationTime.setSeconds(expirationTime.getSeconds() + EXPIRATION_SECONDS)


    // create the order

    const order = await Order.build({
        userId,
        status: OrderStatus.Created,
        expiredAt: expirationTime.toString(),
        ticket
    })


    await order.save()

    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status, 
        expiredAt: expirationTime.toISOString(), 
        version: order.version,
        userId,
        ticket: {
            id: ticket.id,
            price: ticket.price,
            version: ticket.version
        }
    })

    

    res.status(201).send(order)
})

export { router as createOrder }
