import fs from 'fs'
import tmp from 'tmp-promise'
import { ExecResult } from '@common/typings/task'
import { ITaskRunner } from '@typings'
import { exec } from 'child-process-promise'

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
      const process = exec(`python3 ${filePath}`)
      process.childProcess.stdin?.write('test input will be here')
      process.childProcess.stdin?.end()
      const { stdout } = await process

      return { ok: true, output: stdout }
    } catch (e) {
      return { ok: false, output: e.stderr }
    }
  }
}
