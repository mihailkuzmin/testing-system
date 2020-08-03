import fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from 'fastify-cookie'
import fastifySession from 'fastify-session'
import fastifyCors from 'fastify-cors'
import { db } from '@db'
import { routes } from '@routes'
import { appConfig, dbConfig } from './config'

const app: FastifyInstance = fastify(appConfig.fastifyConfig)

const connection = dbConfig

app.register(routes, { prefix: '/api' })
app.register(fastifyCors)
app.register(fastifyCookie)
app.register(fastifySession, appConfig.sessionConfig)

const start = async (): Promise<void> => {
  try {
    await db.connect(connection)
    await app.listen(appConfig.port)
  } catch (e) {
    app.log.error(e)
    setTimeout(start, appConfig.restartTime)
  }
}

start()
