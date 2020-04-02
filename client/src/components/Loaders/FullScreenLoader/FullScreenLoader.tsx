import React from 'react'
import { Circular } from '../Circular'
import styles from './FullScreenLoader.module.css'

export const FullScreenLoader = () => {
  return (
    <div className={styles.loader}>
      <Circular />
      <p>Загрузка</p>
    </div>
  )
}
