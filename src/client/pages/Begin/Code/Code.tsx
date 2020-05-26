import React from 'react'
import { Card } from '@components'
import { PrimaryButton as Button } from '@components/Buttons'
import styles from './Code.module.css'

export const Code = () => {
  return (
    <Card className={styles.code}>
      <Card>
        <code>Your code here</code>
      </Card>

      <div className={styles.actions}>
        <Button variant='contained'>Submit</Button>
        <Button>Test</Button>
      </div>
    </Card>
  )
}
