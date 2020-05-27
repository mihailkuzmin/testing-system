import React from 'react'
import { Card } from '@components'
import { PrimaryButton as Button } from '@components/Buttons'
import { LangSelect } from './LangSelect'
import { Editor } from './Editor'
import styles from './CodeEditor.module.css'

export const CodeEditor = () => {
  return (
    <Card className={styles.code}>
      <Editor />

      <div className={styles.actions}>
        <Button variant='contained'>Сохранить</Button>
        <Button>Тест</Button>
        <LangSelect />
      </div>
    </Card>
  )
}
