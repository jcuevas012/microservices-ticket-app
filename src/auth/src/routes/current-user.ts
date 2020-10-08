import { Request, Response, Router } from 'express'

import currentUser from '../middlewares/current-user'
import requireAuth from '../middlewares/require-auth'

const router = Router()

router.get('/current-user', currentUser, requireAuth, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
