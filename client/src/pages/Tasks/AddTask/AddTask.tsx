import React from 'react'
import { Editor } from './Editor'
import { Paper } from '../../../components'
import { Input } from '../../../components/Inputs'
import {
  PrimaryButton as Save,
  PlusButton as Plus,
  MinusButton as Minus,
} from '../../../components/Buttons'
import styles from './AddTask.module.css'

export const AddTask = () => {
  return (
    <Paper className={styles.addTask}>
      <form className={styles.addForm}>
        <div className={styles.header}>
          <h2 className={styles.title}>Добавить задание</h2>
          <Save>Сохранить</Save>
        </div>
        <Editor />
        <div className={styles.fields}>
          <h3>Добавьте тесты к заданию</h3>
          <div className={styles.testsControl}>
            <span>Тестов: 1</span>
            <Plus />
            <Minus />
          </div>
          <Input label='Пример входных данных' multiline />
          <Input label='Пример выходных данных' multiline />
        </div>
      </form>
    </Paper>
  )
}
