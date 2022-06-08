import { requireAuth } from '@black-tickets/utils'
import express, { Request, Response } from 'express'
// import Ticket from '../models/ticket'

const router = express.Router()

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.currentUser.id


    res.status(200).send({ id, userId })
})

export { router as getOrder }
