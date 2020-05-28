import React from 'react'
import { useStore } from 'effector-react'
import { WorkId } from '@common/typings/work'
import { Paper } from '@components'
import { PageError, PageLoader } from '@components/Loaders'
import { BeginPage } from '@pages/Begin/model/page'
import { TaskDescription } from './TaskDescription'
import { TaskList } from './TaskList'
import { CodeEditor } from './CodeEditor'
import styles from './Begin.module.css'

type BeginProps = { id: WorkId }

export const Begin = ({ id }: BeginProps) => {
  React.useEffect(() => BeginPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(BeginPage.$status)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

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
