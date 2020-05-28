import React from 'react'
import { PlusButton as Add } from '@components/Buttons'
import styles from './TestsCounter.module.css'

type TestCounterProps = { count: number; onClick: () => void }

export const TestsCounter = ({ count, onClick }: TestCounterProps) => (
  <div className={styles.counter}>
    <span>Тестов: {count}</span>
    <Add onClick={onClick} />
  </div>
)
