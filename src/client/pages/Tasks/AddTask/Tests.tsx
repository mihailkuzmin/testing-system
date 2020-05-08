import React from 'react'
import { useList } from 'effector-react'
import { DeleteButton as Delete } from '@components/Buttons'
import { addForm } from '../model/addTask/addForm'
import { ExampleInput, ExampleOutput } from './Inputs'
import styles from './AddTask.module.css'

export const Tests = () => {
  const list = useList(addForm.$tests, (test) => (
    <React.Fragment key={test.id}>
      <ExampleInput id={test.id} />
      <ExampleOutput id={test.id} />
      <Delete onClick={() => addForm.removeTest(test.id)} />
    </React.Fragment>
  ))
  return <div className={styles.testsList}>{list}</div>
}
