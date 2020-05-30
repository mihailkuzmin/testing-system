import { FastifyInstance } from 'fastify'
import { ExecResult, Test } from '@common/typings/task'

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
  run(code: string, tests: Test[]): Promise<ExecResult[]>
}
