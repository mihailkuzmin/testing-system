import React from 'react'
import { useStore } from 'effector-react'
import { workspace } from '@pages/Begin/model'
import { ExecResult } from '@common/typings/task'
import styles from './Console.module.css'

export const Console = () => {
  const { runPending, execResult, testsPassed } = useStore(workspace.$codeEditor)

  return (
    <div className={styles.consoleWrap}>
      <div className={styles.console}>
        {runPending ? (
          <div>Выполнение...</div>
        ) : (
          <>
            {execResult.length > 0 && (
              <div>
                Пройдено тестов: {testsPassed} из {execResult.length}
              </div>
            )}
            {execResult.map((result, index) => (
              <Result key={index} number={index + 1} {...result} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

type ExecResultProps = ExecResult & { number: number }

const Result = (props: ExecResultProps) => {
  if (props.ok) {
    return (
      <div className={styles.execOk}>
        <span>{props.number}. [+] Тест пройден</span>
      </div>
    )
  }

  return (
    <div className={styles.execError}>
      <span>
        {props.number}. [-] Тест не пройден. {props.timeoutError && props.output}
      </span>
    </div>
  )
}
