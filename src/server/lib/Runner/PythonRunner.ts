import fs from 'fs'
import tmp from 'tmp-promise'
import { execFile, PromiseResult } from 'child-process-promise'
import { ExecResult, Test } from '@common/typings/task'
import { timeout } from '@common/helpers'
import { ITaskRunner } from '@typings'

export class PythonRunner implements ITaskRunner {
  async run(code: string, tests: Test[]): Promise<ExecResult[]> {
    const { path, cleanup } = await tmp.file({ postfix: '.py' })
    await fs.promises.writeFile(path, code)

    const processes = tests.map((test) => this.exec(path, test.input, test.output))
    const result = await Promise.all(processes)

    await cleanup()
    return result
  }

  private async startTimeoutTimer(): Promise<ExecResult> {
    await timeout(2000)
    return {
      ok: false,
      runtimeError: true,
      timeoutError: true,
      output: 'Превышен лимит времени выполнения',
    }
  }

  private async exec(filePath: string, testInput: string, testOutput: string): Promise<ExecResult> {
    try {
      const process = execFile('python3', [filePath])
      process.childProcess.stdin?.write(testInput)
      process.childProcess.stdin?.end()
      const result = await Promise.race([this.startTimeoutTimer(), process])

      if (result.hasOwnProperty('timeoutError')) {
        process.childProcess.kill()
        return { ...result, testInput, testOutput } as ExecResult
      }

      const processResult = result as PromiseResult<string>

      const output = processResult.stdout.trim()
      const ok = output === testOutput

      return { ok, runtimeError: false, output, testInput, testOutput }
    } catch (e) {
      return { ok: false, runtimeError: true, output: e.stderr }
    }
  }
}
