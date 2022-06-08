import * as nats from 'node-nats-streaming';
import { Stan } from 'node-nats-streaming';


class NatsWrapper {
    private _client: Stan;

    get client() {
        if (!this._client) {
            throw new Error('Should connect to NATS before accessing client')
        }
        
        return this._client
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url})

        return new Promise<void>((resolve, reject ) =>{
            this._client.on('connect', () => {
                console.log(`Connected to NATS cluster ::: ${clusterId} client ${clientId}`)
                resolve()
            })

            this._client.on('error', (err)=> {
                reject(err)
            })
        })
    }
}


export default new NatsWrapper()