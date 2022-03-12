import request from 'supertest'
import { app } from '../../app'

describe('/api/tickets routes', () => {
    it('handle /api/tickets for post request', async () => {
        await request(app).post('/api/tickets').set('Cookie', global.signin()).send({}).expect(201)
    })

    it('can only be accessed if the user is signed in', async () => {
        await request(app).post('/api/tickets').send({}).expect(401)
    })
    it('not return 401 if user is signed in', async () => {
        const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({})
        expect(response.statusCode).not.toEqual(401)
    })

    it('handle GET /api/tickets for get list of tickets', async () => {
        const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
            title: 'title ticket',
        })
        expect(response.statusCode).not.toEqual(401)
    })

    it('return error is invalid ticket payload is provided', async () => {})

    it('handle POST /api/tickets create ticket successfully', async () => {})
})
