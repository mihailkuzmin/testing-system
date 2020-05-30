import React from 'react'
import { useStore } from 'effector-react'
import { workspace } from '@pages/Begin/model'
import styles from './Console.module.css'

export const Console = () => {
  const { runPending, execResult } = useStore(workspace.$codeEditor)

  return (
    <div className={styles.consoleWrap}>
      <div className={styles.console}>
        {runPending ? (
          <div>Выполнение...</div>
        ) : (
          <>
            {execResult.map((result, index) => (
              <div key={index} className={result.ok ? styles.execOk : styles.execError}>
                <div>Входные данные: {result.testInput}</div>
                <div>Выходные данные: {result.testOutput}</div>
                <div>Вывод программы: {result.output}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
