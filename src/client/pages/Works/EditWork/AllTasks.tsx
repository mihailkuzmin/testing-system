import React from 'react'
import { useStore } from 'effector-react'
import { PlusButton as Add } from '@components/Buttons'
import { Item, Select } from '@components/Inputs/Select'
import { TaskId, TopicId } from '@common/typings/task'
import { editForm } from '../model/editWork'
import { Task } from './Task'
import styles from './EditWork.module.css'

const TopicSelect = () => {
  const { topics, selected } = useStore(editForm.$topics)

  return (
    <Select
      value={selected?.id ?? ''}
      label='Тема'
      onChange={(e) => editForm.topicChange(e.target.value as TopicId)}
    >
      {topics.map((topic) => (
        <Item key={topic.id} value={topic.id}>
          {topic.name}
        </Item>
      ))}
    </Select>
  )
}

export const AllTasks = () => {
  const { tasks } = useStore(editForm.$tasks)
  const tasksIsEmpty = tasks.length === 0

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.dataset.id)

    editForm.addTask(id as TaskId)
  }

  return (
    <div className={styles.allTasks}>
      <div className={styles.flexBetween}>
        <h3>Все задания</h3>
        <TopicSelect />
      </div>
      <div className={styles.tasksList}>
        {tasksIsEmpty ? (
          <div className={styles.emptyList}>
            <span>Заданий на эту тему пока нет</span>
          </div>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} id={task.id} name={task.name} topic={task.topic.name}>
              <Add data-id={task.id} onClick={onAddClick} />
            </Task>
          ))
        )}
      </div>
    </div>
  )
}
