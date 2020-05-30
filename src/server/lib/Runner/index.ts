import { PLangs } from '@common/typings/task'
import { ITaskRunner } from '@typings'
import { PythonRunner } from './PythonRunner'
import { NodeRunner } from './NodeRunner'
import { PascalRunner } from './PascalRunner'

export class Runner {
  static create(lang: PLangs): { runner?: ITaskRunner; error?: string } {
    switch (lang) {
      case PLangs.Python:
        return { runner: new PythonRunner() }
      case PLangs.NodeJS:
        return { runner: new NodeRunner() }
      case PLangs.Pascal:
        return { runner: new PascalRunner() }
      default:
        return { error: 'Unsupported language' }
    }
  }
}
