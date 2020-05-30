import fs from 'fs'
import tmp from 'tmp-promise'
import { ExecResult, Test } from '@common/typings/task'
import { ITaskRunner } from '@typings'
import { exec, PromiseResult } from 'child-process-promise'
import { timeout } from '@common/helpers'

export class PascalRunner implements ITaskRunner {
  async run(code: string, tests: Test[]): Promise<ExecResult[]> {
    const tempDir = await tmp.dir({ unsafeCleanup: true })
    const sourceFile = await tmp.file({ dir: tempDir.path, postfix: '.pas' })
    await fs.promises.writeFile(sourceFile.path, code)

    const compileResult = await this.compile(sourceFile.path)
    if (!compileResult.ok) {
      await tempDir.cleanup()
      return [compileResult]
    }
    const compiledFilePath = compileResult.output

    const processes = tests.map((test) => this.exec(compiledFilePath, test.input, test.output))
    const result = await Promise.all(processes)

    await tempDir.cleanup()
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
      const process = exec(`mono ${filePath}`)
      process.childProcess.stdin?.write(`${testInput}\n`)
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

  private async compile(filePath: string): Promise<ExecResult> {
    try {
      await exec(`mono ~/pascal/pabcnetc.exe ${filePath}`)
      const compiledFilePath = filePath.replace('.pas', '.exe')

      return { ok: true, runtimeError: false, output: compiledFilePath }
    } catch (e) {
      return { ok: false, runtimeError: true, output: e.stdout }
    }
  }
}
