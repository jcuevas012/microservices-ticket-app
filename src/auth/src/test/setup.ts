import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongo: any

beforeAll(async () => {
    console.log('Before All')
    process.env.JWT_KEY = '212182hjhd'

    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (const collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongoose.connection.close()
    await mongo.stop()
})
