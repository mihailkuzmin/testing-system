import React from 'react'
import { useStore, useStoreMap } from 'effector-react'
import { Item, Select } from '@components/Inputs/Select'
import { CreateTestId, TopicId } from '@common/typings/task'
import { Input } from '@components/Inputs/Input'
import { Editor } from '@components/Editor'
import { addForm } from '@pages/Tasks/model/addTask'

type ExampleInputProps = { id: CreateTestId }
type ExampleOutputProps = { id: CreateTestId }

export const TopicSelect = () => {
  const topics = useStore(addForm.$topics)
  const value = useStore(addForm.$selectedTopic)

  return (
    <Select
      label='Тема'
      value={value ?? ''}
      onChange={(e) => addForm.topicChange(e.target.value as TopicId)}
    >
      {topics.map((topic) => (
        <Item key={topic.id} value={topic.id}>
          {topic.name}
        </Item>
      ))}
    </Select>
  )
}

export const ExampleInput = ({ id }: ExampleInputProps) => {
  const value = useStoreMap({
    store: addForm.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.input || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => addForm.inputChange({ id, value: e.target.value })}
      label='Пример входных данных'
      multiline
    />
  )
}

export const ExampleOutput = ({ id }: ExampleOutputProps) => {
  const value = useStoreMap({
    store: addForm.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.output || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => addForm.outputChange({ id, value: e.target.value })}
      label='Пример выходных данных'
      multiline
    />
  )
}

export const NameInput = () => {
  const name = useStore(addForm.$name)

  return (
    <Input
      value={name}
      onChange={(e) => addForm.nameChange(e.target.value)}
      label='Название задания'
    />
  )
}

export const DescriptionInput = () => {
  const description = useStore(addForm.$description)

  return <Editor content={description} onChange={addForm.descriptionChange} />
}
