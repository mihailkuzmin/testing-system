import React from 'react'
import styles from './Navigation.module.css'

interface IListProps {
  children?: React.ReactNode
}

export const List = ({ children }: IListProps) => {
  return <ul className={styles.list}>{children}</ul>
}
