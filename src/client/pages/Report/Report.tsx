import React from 'react'
import { Paper } from '@components'
import { useStore } from 'effector-react'
import { PageError, PageLoader } from '@components/Loaders'
import { Divider } from '@material-ui/core'
import { report } from './model'
import { Work } from './Work/Work'
import styles from './styles.module.css'

export const Report = () => {
  React.useEffect(() => report.page.onMount(), [])

  const { isLoading, isFail } = useStore(report.page.status)
  const { works, selectedWorkId } = useStore(report.works.$works)

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
        <div>
          {works.map((w, index) => (
            <Work
              key={w.id}
              number={index + 1}
              name={w.name}
              selected={selectedWorkId === w.id}
              onOpen={() => report.works.selectWork(w.id)}
              onClose={() => report.works.unselectWork()}
            />
          ))}
        </div>
      )}
    </Paper>
  )
}
