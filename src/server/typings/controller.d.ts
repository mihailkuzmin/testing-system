import { FastifyInstance } from 'fastify'

export type Controller = {
  (
    app: FastifyInstance,
    options: {
      prefix?: string
      logLevel?: string
      logSerializers?: any
    },
    done: () => void,
  ): void
}
