import { PLangs } from '@common/typings/task'
import { ITaskRunner } from '@typings'
import { PythonRunner } from './PythonRunner'
import { JavaScriptRunner } from './JavaScriptRunner'

export class Runner {
  static create(lang: PLangs): { runner?: ITaskRunner; error?: string } {
    switch (lang) {
      case PLangs.Python:
        return { runner: new PythonRunner() }
      case PLangs.JavaScript:
        return { runner: new JavaScriptRunner() }
      default:
        return { error: 'Unsupported language' }
    }
  }
}
