import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { PrimaryButton as Button } from '@components/Buttons'
import { workspace } from '../model'
import { Tabs } from '../model/workspace/typings'
import { TabControl } from './TabControl'
import { LangSelect } from './LangSelect'
import { Editor } from './Editor'
import { Console } from './Console'
import styles from './CodeEditor.module.css'

export const CodeEditor = () => {
  const { tab, runPending, canRun } = useStore(workspace.$codeEditor)
  const editorSelected = tab === Tabs.Editor

  return (
    <Card className={styles.codeEditor}>
      <TabControl disabled={runPending} />
      <Divider />

      {editorSelected ? <Editor /> : <Console />}

      <Divider />
      <div className={styles.editorControl}>
        <Button disabled={runPending || !canRun} onClick={() => workspace.testTask()}>
          Запуск
        </Button>
        <LangSelect disabled={runPending} />
      </div>
    </Card>
  )
}
