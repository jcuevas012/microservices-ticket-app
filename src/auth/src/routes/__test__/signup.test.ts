import supertest from 'supertest'
import { app } from '../../app'

describe('users endpoint', function () {
    const agent = supertest.agent(app)

    it('GET current-user ', () => {
        return agent.get('/api/users/current-user').expect(401)
    })
})
