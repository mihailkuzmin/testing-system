import React from 'react'
import { useList } from 'effector-react'
import { DeleteButton as Delete } from '@components/Buttons'
import { addForm } from '@pages/Tasks/model/addTask'
import { TestInput } from './TestInput'
import { TestOutput } from './TestOutput'
import styles from './TestList.module.css'

export const TestList = () => {
  const list = useList(addForm.$tests, (test) => (
    <React.Fragment key={test.id}>
      <TestInput id={test.id} />
      <TestOutput id={test.id} />
      <Delete onClick={() => addForm.removeTest(test.id)} />
    </React.Fragment>
  ))
  return <div className={styles.list}>{list}</div>
}
