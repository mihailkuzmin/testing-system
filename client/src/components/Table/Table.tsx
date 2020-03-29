import React from 'react'
import { Table as MaterialTable } from '@material-ui/core'
import styles from './Table.module.css'

interface ITableProps {
  children?: React.ReactNode
}

export const Table = ({ children }: ITableProps) => {
  return <MaterialTable className={styles.table}>{children}</MaterialTable>
}
