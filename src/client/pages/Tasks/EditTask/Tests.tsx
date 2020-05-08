import React from 'react'
import { useList } from 'effector-react'
import { tests } from '../model/editTask'
import { DeleteButton as Delete } from '@components/Buttons'
import { UpdateTestId } from '../model/editTask/editForm/typings'
import { ExampleInput, ExampleOutput } from './Inputs'
import styles from './EditTask.module.css'

export const Tests = () => {
  const list = useList(tests.$tests, (test) => (
    <React.Fragment key={test.id}>
      <ExampleInput id={test.id} />
      <ExampleOutput id={test.id} />
      <DeleteButton id={test.id} old={test.old} />
    </React.Fragment>
  ))

  return <div className={styles.testsList}>{list}</div>
}

type DeleteButtonProps = { id: UpdateTestId; old: boolean }

const DeleteButton = React.memo(({ id, old }: DeleteButtonProps) => (
  <Delete onClick={() => tests.removeTest({ id, old })} />
))
