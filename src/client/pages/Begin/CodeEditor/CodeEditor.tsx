import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { workspace } from '../model'
import { Tabs } from '../model/workspace/typings'
import { TabControl } from './TabControl'
import styles from './CodeEditor.module.css'

export const CodeEditor = () => {
  const { code, console, tab } = useStore(workspace.$codeEditor)
  const consoleSelected = tab === Tabs.Console

  return (
    <Card className={styles.codeEditor}>
      <TabControl />
      <Divider />
      <textarea
        value={consoleSelected ? console : code}
        disabled={consoleSelected}
        onChange={(e) => workspace.codeChanged(e.target.value)}
        className={styles.editor}
      />
    </Card>
  )
}
