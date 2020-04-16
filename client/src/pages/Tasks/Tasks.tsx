import React from 'react'
import { IPageProps } from '../../typings'
import { Layout } from '../../components'
import { TasksTable } from './TasksTable'
import { TasksPage } from './model'

export const Tasks = (props: IPageProps) => {
  React.useEffect(TasksPage.onMount, [])

  return (
    <Layout>
      <TasksTable />
    </Layout>
  )
}
