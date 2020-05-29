import React from 'react'
import { useStore } from 'effector-react'
import { PageLoader, PageError } from '@components/Loaders'
import { Paper } from '@components'
import { Divider } from '@material-ui/core'
import { PreviewPage, taskPreview } from '../model/previewTask'
import styles from './PreviewTask.module.css'

type PreviewTaskProps = { id: number }

export const PreviewTask = ({ id }: PreviewTaskProps) => {
  React.useEffect(() => PreviewPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(PreviewPage.$status)
  const preview = useStore(taskPreview.$taskPreview)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.preview}>
      <div className={styles.previewHeader}>
        <h2>Задание "{preview?.name}"</h2>
        <span>Тема: {preview?.topic.name}</span>
      </div>

      <Divider />

      <div className={styles.taskPreview}>
        <div dangerouslySetInnerHTML={{ __html: preview?.description ?? '' }} />

        <Divider />

        <h3>Примеры входных и выходных данных</h3>
        <div className={styles.testList}>
          {preview?.tests?.map((test) => (
            <div key={test.id} className={styles.test}>
              <div>
                <span>Пример входных данных</span>
                <div>{test.input}</div>
              </div>
              <div>
                <span>Пример выходных данных</span>
                <div>{test.output}</div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </div>
    </Paper>
  )
}
