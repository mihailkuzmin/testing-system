import React from 'react'
import { WorkId } from '@common/typings/work'
import { Paper } from '@components'
import { BeginPage } from '@pages/Begin/model/page'
import { TaskDescription } from './TaskDescription'
import { TaskList } from './TaskList'
import { CodeEditor } from './CodeEditor'
import styles from './Begin.module.css'

type BeginProps = { id: WorkId }

export const Begin = ({ id }: BeginProps) => {
  React.useEffect(() => BeginPage.onMount(id), [id])

  return (
    <div className={styles.wrap}>
      <Paper className={styles.beginPage}>
        <TaskList />
        <TaskDescription />
        <CodeEditor />
      </Paper>
    </div>
  )
}
