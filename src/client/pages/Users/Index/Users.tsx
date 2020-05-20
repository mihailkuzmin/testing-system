import React from 'react'
import { useStore } from 'effector-react'
import { PageLoader, PageError } from '@components/Loaders'
import { IndexPage } from '@pages/Users/model/index'
import { UsersTable } from './UsersTable'

export const Users = () => {
  React.useEffect(IndexPage.onMount, [])

  const { isLoading, isFail } = useStore(IndexPage.$status)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return <UsersTable />
}
