import React from 'react'
import { Circular } from '@components/Loaders'
import styles from './EditTask.module.css'

export const Loader = () => (
  <div className={styles.testsLoader}>
    <Circular />
  </div>
)
