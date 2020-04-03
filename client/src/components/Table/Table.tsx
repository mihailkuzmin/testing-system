import React from 'react'
import { Table as MaterialTable } from '@material-ui/core'
import styles from './Table.module.css'

interface ITableProps {
  children?: React.ReactNode
  className?: string
}

export const Table = (props: ITableProps) => {
  return (
    <MaterialTable className={`${styles.table} ${props.className}`}>
      {props.children}
    </MaterialTable>
  )
}
