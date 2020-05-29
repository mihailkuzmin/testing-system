import fs from 'fs'
import tmp from 'tmp-promise'
import { ExecResult } from '@common/typings/task'
import { ITaskRunner } from '@typings'
import { exec } from 'child-process-promise'

export class PascalRunner implements ITaskRunner {
  async run(code: string): Promise<ExecResult> {
    const tempDir = await tmp.dir({ unsafeCleanup: true })
    const sourceFile = await tmp.file({ dir: tempDir.path, postfix: '.pas' })
    await fs.promises.writeFile(sourceFile.path, code)

    const compileResult = await this.compile(sourceFile.path)
    if (!compileResult.ok) {
      await tempDir.cleanup()
      return compileResult
    }

    const result = await this.exec(compileResult.output)

    await tempDir.cleanup()
    return result
  }

  private async exec(filePath: string): Promise<ExecResult> {
    try {
      const process = exec(`mono ${filePath}`)
      process.childProcess.stdin?.write('test input will be here\n')
      process.childProcess.stdin?.end()
      const { stdout } = await process

      return { ok: true, output: stdout }
    } catch (e) {
      return { ok: false, output: e.stderr }
    }
  }

  private async compile(filePath: string): Promise<ExecResult> {
    try {
      await exec(`mono ~/pascal/pabcnetc.exe ${filePath}`)
      const compiledFilePath = filePath.replace('.pas', '.exe')

      return { ok: true, output: compiledFilePath }
    } catch (e) {
      return { ok: false, output: e.stdout }
    }
  }
}
