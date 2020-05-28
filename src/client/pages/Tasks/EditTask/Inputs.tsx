import React from 'react'
import { useStore } from 'effector-react'
import { Input } from '@components/Inputs'
import { Editor } from '@components'
import { TopicId } from '@common/typings/task'
import { Item, Select } from '@components/Inputs/Select'
import { editForm } from '../model/editTask'

export const TopicSelect = () => {
  const topics = useStore(editForm.$topics)
  const value = useStore(editForm.$selectedTopic)

  return (
    <Select
      label='Тема'
      value={value ?? ''}
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

export const DescriptionInput = () => {
  const description = useStore(editForm.$description)

  return (
    <Editor content={description} onChange={(content) => editForm.descriptionChange(content)} />
  )
}

export const NameInput = () => {
  const name = useStore(editForm.$name)

  return (
    <Input
      value={name}
      onChange={(e) => editForm.nameChange(e.target.value)}
      label='Название задания'
    />
  )
}
