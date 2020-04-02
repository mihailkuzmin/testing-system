import React from 'react'
import { Error } from '../Icons'
import styles from './FullScreenError.module.css'

export const FullScreenError = () => {
  return (
    <div className={styles.error}>
      <Error />
      <p>Произошла ошибка</p>
    </div>
  )
}
