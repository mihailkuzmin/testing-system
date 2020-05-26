import React from 'react'
import { WorkId } from '@common/typings/work'
import { Paper } from '@components'
import { BeginPage } from '@pages/Begin/model'
import { SelectedTask } from './SelectedTask'
import { TaskList } from './TaskList'
import { Code } from './Code'
import styles from './Begin.module.css'

type BeginProps = { id: WorkId }

export const Begin = ({ id }: BeginProps) => {
  React.useEffect(() => BeginPage.onMount(id), [id])

  return (
    <div className={styles.wrap}>
      <Paper className={styles.beginPage}>
        <TaskList />
        <SelectedTask />
        <Code />
      </Paper>
    </div>
  )
}
