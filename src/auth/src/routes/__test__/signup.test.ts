import request from 'supertest'
import { app } from '../../app'

it('http 200 status signup ', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'jcq012@gmail.com',
            password: '1234asdt',
        })
        .expect(200)
})
