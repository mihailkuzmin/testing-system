import React from 'react'
import { IPageProps } from '../../typings'
import { Layout } from '../../components'
import { UsersTable } from './UsersTable'

export const Users = (props: IPageProps) => {
  return (
    <Layout>
      <UsersTable />
    </Layout>
  )
}
