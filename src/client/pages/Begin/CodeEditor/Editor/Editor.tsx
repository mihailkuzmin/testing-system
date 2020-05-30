import React from 'react'
import { useStore } from 'effector-react'
import { workspace } from '@pages/Begin/model'
import styles from './Editor.module.css'

export const Editor = () => {
  const { code } = useStore(workspace.$codeEditor)

  return (
    <textarea
      value={code}
      onChange={(e) => workspace.codeChanged(e.target.value)}
      className={styles.editor}
    />
  )
}
