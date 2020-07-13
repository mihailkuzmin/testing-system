import React from 'react'
import { Paper } from '@components'
import { useStore } from 'effector-react'
import { Circular, PageError, PageLoader } from '@components/Loaders'
import { Divider } from '@material-ui/core'
import { report } from './model'
import styles from './styles.module.css'
import { WorkListItem } from '@pages/Report/Work'

export const Report = () => {
  React.useEffect(() => report.page.onMount(), [])

  const { isLoading, isFail } = useStore(report.page.status)
  const works = useStore(report.$works)
  const isEmpty = !works.length

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.reportPage}>
      <h3>Результаты</h3>

      <Divider />

      {isEmpty ? (
        <div>Результатов пока нет</div>
      ) : (
        <div className={styles.workList}>
          {works.map((w) => (
            <WorkListItem key={w.id} {...w} />
          ))}
        </div>
      )}
    </Paper>
  )
}
