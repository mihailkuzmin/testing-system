import util from 'util'
import cp from 'child_process'
import fs from 'fs'
import tmp from 'tmp-promise'
import { ExecResult } from '@common/typings/task'
import { ITaskRunner } from '@typings'

const exec = util.promisify(cp.exec)

export class PythonRunner implements ITaskRunner {
  async run(code: string): Promise<ExecResult> {
    const { path, cleanup } = await tmp.file({ postfix: '.py' })
    await fs.promises.writeFile(path, code)

    const result = await this.exec(path)

    await cleanup()
    return result
  }

  private async exec(filePath: string): Promise<ExecResult> {
    try {
      const { stdout } = await exec(`python3 ${filePath}`)
      return { ok: true, output: stdout }
    } catch (e) {
      return { ok: false, output: e.stderr }
    }
  }
}
