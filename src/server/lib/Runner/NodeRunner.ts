import fs from 'fs'
import tmp from 'tmp-promise'
import { ExecResult, Test } from '@common/typings/task'
import { ITaskRunner } from '@typings'
import { exec } from 'child-process-promise'

export class NodeRunner implements ITaskRunner {
  async run(code: string, tests: Test[]): Promise<ExecResult[]> {
    const { path, cleanup } = await tmp.file({ postfix: '.js' })
    await fs.promises.writeFile(path, code)

    const processes = tests.map((test) => this.exec(path, test.input, test.output))
    const result = await Promise.all(processes)

    await cleanup()
    return result
  }

  private async exec(filePath: string, testInput: string, testOutput: string): Promise<ExecResult> {
    try {
      const process = exec(`node ${filePath}`)
      process.childProcess.stdin?.write(testInput)
      process.childProcess.stdin?.end()
      const { stdout } = await process
      const output = stdout.trim()

      const ok = output === testOutput

      return { ok, runtimeError: false, output, testInput, testOutput }
    } catch (e) {
      return { ok: false, runtimeError: true, output: e.stderr }
    }
  }
}
