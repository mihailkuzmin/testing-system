import React from 'react'
import { PlusButton as Add } from '@components/Buttons'
import styles from './TestsCounter.module.css'

type TestsCounterProps = { count: number; onClick: () => void }

export const TestsCounter = ({ count, onClick }: TestsCounterProps) => (
  <div className={styles.counter}>
    <span>Тестов: {count}</span>
    <Add onClick={onClick} />
  </div>
)
