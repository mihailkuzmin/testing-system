import fastify, { FastifyInstance } from 'fastify'
import { routes } from './routes'
import { PoolConfig } from 'pg'
import { db } from './db'
import config from '../config.json'

const app: FastifyInstance = fastify({ logger: config.logger })
const connection: PoolConfig = config.db

const start = async (): Promise<void> => {
  try {
    await db.connect(connection)
    app.register(routes, { prefix: '/api' })
    await app.listen(config.port)
  } catch (e) {
    app.log.error(e)
    setTimeout(start, config.restartTime)
  }
}

start()
