import React from 'react'
import { useStore } from 'effector-react'
import { PageLoader, PageError } from '@components/Loaders'
import { Paper } from '@components'
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
      <span>Тема: {preview?.topic}</span>
      <div className={styles.card}>
        <span>Описание</span>
        <div dangerouslySetInnerHTML={{ __html: preview?.description ?? '' }}></div>
      </div>
      <div className={styles.card}>
        <span>Пример входных данных</span>
        <div className={styles.test}>{preview?.test.input}</div>
      </div>
      <div className={styles.card}>
        <span>Пример выходных данных</span>
        <div className={styles.test}>{preview?.test.output}</div>
      </div>
    </Paper>
  )
}
