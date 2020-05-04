import React from 'react'
import { PlusButton as Add } from '../../../components/Buttons'
import styles from './AddTask.module.css'

type TestCounterProps = { count: number; onClick: () => void }

export const TestsCounter = ({ count, onClick }: TestCounterProps) => (
  <div className={styles.testsCounter}>
    <span>Тестов: {count}</span>
    <Add onClick={onClick} />
  </div>
)
