import { FastifyInstance } from 'fastify'
import { ExecResult } from '@common/typings/task'

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

export interface ITaskRunner {
  run(code: string): Promise<ExecResult>
}
