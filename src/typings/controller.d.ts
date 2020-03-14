import { FastifyInstance } from 'fastify'

export interface IController {
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
