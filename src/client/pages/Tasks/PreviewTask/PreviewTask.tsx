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
      <h2>Задание "{preview?.name}"</h2>
      <span>Тема: {preview?.topic.name}</span>

      <Divider />

      <div className={styles.taskPreview}>
        <div dangerouslySetInnerHTML={{ __html: preview?.description ?? '' }}></div>

        <Divider />

        <div className={styles.tests}>
          {preview?.tests?.map((test) => (
            <React.Fragment key={test.id}>
              <div>
                <span>Пример входных данных</span>
                <div className={styles.test}>{test.input}</div>
              </div>
              <div>
                <span>Пример выходных данных</span>
                <div className={styles.test}>{test.output}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Paper>
  )
}
