import React from 'react'
import { useStore } from 'effector-react'
import { PageProps } from '../../../typings'
import { PageLoader, PageError } from '../../../components/Loaders'
import { TasksTable } from './TasksTable'
import { TasksPage } from '../model/index'

export const Tasks = (props: PageProps) => {
  React.useEffect(TasksPage.onMount, [])

  const { isLoading, isFail } = useStore(TasksPage.$status)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return <TasksTable />
}
