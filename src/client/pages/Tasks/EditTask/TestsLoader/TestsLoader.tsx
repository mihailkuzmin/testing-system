import React from 'react'
import { Circular } from '@components/Loaders'
import styles from './TestsLoader.module.css'

export const TestsLoader = () => (
  <div className={styles.loader}>
    <Circular />
  </div>
)
