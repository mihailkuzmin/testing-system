import React from 'react'
import { useStore } from 'effector-react'
import { Card } from '@components'
import { workspace } from '../../model'
import styles from './Editor.module.css'

export const Editor = () => {
  const code = useStore(workspace.$code)

  return (
    <Card className={styles.card}>
      <textarea
        value={code}
        onChange={(e) => workspace.codeChanged(e.target.value)}
        className={styles.editor}
      />
    </Card>
  )
}
