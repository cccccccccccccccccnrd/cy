import * as path from 'path'
import * as express from 'express'

export function serve (port: number) {
  const settings = {
    port,
    staticPath: path.join(__dirname, '../public')
  }
  const server = express()

  server.use(express.static(settings.staticPath))
  server.listen(settings.port)

  console.log(`http-server serving on port ${settings.port}`)

  return server
}