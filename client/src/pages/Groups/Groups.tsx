import React from 'react'
import { IPageProps } from '../../typings'
import {GroupsTable} from './GroupsTable'
import {Layout} from '../../components'

export const Groups = (props: IPageProps) => {
  return (<Layout>
    <GroupsTable />
  </Layout>)
}
