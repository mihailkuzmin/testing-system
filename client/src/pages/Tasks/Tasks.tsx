import React from 'react'
import { useStore } from 'effector-react'
import { IPageProps } from '../../typings'
import { Layout } from '../../components'
import { PageLoader, PageError } from '../../components/Loaders'
import { TasksTable } from './TasksTable'
import { TasksPage } from './model'

export const Tasks = (props: IPageProps) => {
  React.useEffect(TasksPage.onMount, [])

  const { isLoading, isFail } = useStore(TasksPage.$status)
  
  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Layout>
      <TasksTable />
    </Layout>
  )
}
