import fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from 'fastify-cookie'
import fastifyCors from 'fastify-cors'
import { PoolConfig } from 'pg'
import { routes } from './routes'
import { db } from './db'
import config from './dev.config.json'

const app: FastifyInstance = fastify({ logger: config.logger })
const connection: PoolConfig = config.db

app.register(routes, { prefix: '/api' })
app.register(fastifyCookie)
app.register(fastifyCors)

const start = async (): Promise<void> => {
  try {
    await db.connect(connection)
    await app.listen(config.port)
  } catch (e) {
    app.log.error(e)
    setTimeout(start, config.restartTime)
  }
}

start()
