import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { PrimaryButton as Button } from '@components/Buttons'
import { workspace } from '../model'
import { Tabs } from '../model/workspace/typings'
import { TabControl } from './TabControl'
import { LangSelect } from './LangSelect'
import styles from './CodeEditor.module.css'

export const CodeEditor = () => {
  const { code, console, tab, runPending } = useStore(workspace.$codeEditor)
  const codeSelected = tab === Tabs.Editor

  return (
    <Card className={styles.codeEditor}>
      <TabControl disabled={runPending} />
      <Divider />
      <textarea
        value={codeSelected ? code : console}
        disabled={!codeSelected}
        onChange={(e) => workspace.codeChanged(e.target.value)}
        className={styles.editor}
      />
      <Divider />
      <div className={styles.editorControl}>
        <Button disabled={runPending} onClick={() => workspace.submitTask()}>
          Submit
        </Button>
        <Button disabled={runPending} onClick={() => workspace.testTask()}>
          Test
        </Button>
        <LangSelect disabled={runPending} />
      </div>
    </Card>
  )
}
