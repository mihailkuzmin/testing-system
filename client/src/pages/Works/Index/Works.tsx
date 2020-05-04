import React from 'react'
import { useStore } from 'effector-react'
import { PageLoader, PageError } from '../../../components/Loaders'
import { WorksPage } from '../model/index/page'
import { WorksTable } from './WorksTable'

export const Works = () => {
  React.useEffect(WorksPage.onMount, [])

  const { isLoading, isFail } = useStore(WorksPage.$status)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return <WorksTable />
}
