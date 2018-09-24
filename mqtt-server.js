const mosca = require('mosca')
const mqtt = require('mqtt')

let server, client

function serve (port) {
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

  server.on('clientConnected', (client) => {
    console.log(`${ Date.now() } client connected ${ client.id }`)
  })

  server.on('clientDisconnected', (client) => {
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

function get (clientOrServer) {
  if (clientOrServer === 'server') return server
  if (clientOrServer === 'client') return client
  else {
    throw Error(`Could not find ${clientOrServer}`)
  }
}

module.exports = {
  serve,
  get
}
