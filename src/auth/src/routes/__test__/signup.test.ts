import supertest from 'supertest'
import { app } from '../../app'

describe('/users endpoint', function () {
    const agent = supertest.agent(app)
    it('GET current-user ', () => {
        return agent.get('/api/users/current-user').expect(401)
    })

    it('POST /users/signup ', () => {
        return agent
            .post('/api/users/signup')
            .send({
                email: 'test@gmail.com',
                password: 'test1323',
            })
            .expect(201)
    })
})
