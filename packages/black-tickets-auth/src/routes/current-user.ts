import { Request, Response, Router } from 'express'

import { currentUser, requireAuth } from '@black-tickets/utils'

const router = Router()

router.get('/current-user', currentUser, requireAuth, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
