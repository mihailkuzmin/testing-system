import React from 'react'
import { useStore } from 'effector-react'
import { PageLoader, PageError } from '@components/Loaders'
import { Paper } from '@components'
import { WorkId } from '@common/typings/work'
import { Divider } from '@material-ui/core'
import { PreviewPage, workPreview } from '../model/previewWork'
import { TaskPreview } from './TaskPreview'
import styles from './PreviewWork.module.css'

type PreviewWorkProps = { id: WorkId }

export const PreviewWork = ({ id }: PreviewWorkProps) => {
  React.useEffect(() => PreviewPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(PreviewPage.$status)
  const work = useStore(workPreview.$preview)
  const tasks = useStore(workPreview.$tasks)
  console.log(tasks)
  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.previewWork}>
      <h2>Работа "{work?.name}"</h2>

      <Divider />

      {tasks.map((task, index) => (
        <TaskPreview
          key={task.id}
          id={task.id}
          name={task.name}
          number={index + 1}
          description={task.description}
          topic={task.topic}
          tests={task.tests}
        />
      ))}
    </Paper>
  )
}
