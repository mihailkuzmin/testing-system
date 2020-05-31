import fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from 'fastify-cookie'
import fastifySession from 'fastify-session'
import fastifyCors from 'fastify-cors'
import qs from 'qs'
import { PoolConfig } from 'pg'
import { db } from '@db'
import { routes } from '@routes'
import config from './config.json'

const app: FastifyInstance = fastify({
  logger: config.logger,
  querystringParser: (str) => qs.parse(str) as any,
})

const connection: PoolConfig = config.db

app.register(routes, { prefix: '/api' })
app.register(fastifyCors)
app.register(fastifyCookie)
app.register(fastifySession, config.session)

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
