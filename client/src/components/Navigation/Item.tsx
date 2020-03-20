import React from 'react'
import styles from './Navigation.module.css'

interface IItemProps {
  children?: React.ReactNode
}

export const Item = ({ children }: IItemProps) => {
  return <li className={styles.item}>{children}</li>
}
