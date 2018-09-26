import * as mosca from 'mosca'
import * as mqtt from 'mqtt'
import { MqttClient } from 'mqtt'

export let server: mosca.Server
export let client: MqttClient

export function serve (port: number) {
  const settings = {
    http: {
      port,
      bundle: true,
      static: __dirname
    },
    persistence: {
      factory: mosca.persistence.Memory
    }
  }
  server = new mosca.Server(settings)

  server.on('ready', function () {
    console.log('mqtt-server is running on port', settings.http.port)
  })

  server.on('clientConnected', (client: mosca.Client) => {
    console.log(`${ Date.now() } client connected ${ client.id }`)
  })

  server.on('clientDisconnected', (client: mosca.Client) => {
    console.log(`${ Date.now() } client disconnected ${ client.id }`)
  })

  /* MQTT client setup */
  const clientSettings = {
    clientId: 'broker-client-' + Math.random().toString(16).substr(2, 8),
  }

  client = mqtt.connect('mqtt://127.0.0.1', clientSettings)

  client.on('connect', () => {
    client.subscribe('actor/#')
  })
}
