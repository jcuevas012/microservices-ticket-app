import express, { Request, Response } from 'express'
// import Ticket from '../models/ticket'

const router = express.Router()

router.get('/:id', async (_req: Request, res: Response) => {
    res.status(200).send({})
})

export { router as getOrder }
