import React from 'react'
import { useStore, useStoreMap } from 'effector-react'
import { Input } from '../../../../components/Inputs'
import { Editor } from '../../../../components'
import { tests, editForm } from '../../model/editTask'
import { TopicId, UpdateTestId } from '../../model/editTask/editForm/typings'
import { Item, Select } from '../../../../components/Inputs/Select'

type ExampleInputProps = { id: UpdateTestId }
type ExampleOutputProps = { id: UpdateTestId }

export const TopicSelect = () => {
  const topics = useStore(editForm.$topics)
  const value = useStore(editForm.$selectedTopic)

  return (
    <Select
      label='Тема'
      value={value}
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

export const ExampleInput = React.memo(({ id }: ExampleInputProps) => {
  const value = useStoreMap({
    store: tests.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.input || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => tests.inputChange({ id, value: e.target.value })}
      label='Пример входных данных'
      multiline
    />
  )
})

export const ExampleOutput = React.memo(({ id }: ExampleOutputProps) => {
  const value = useStoreMap({
    store: tests.$tests,
    keys: [id],
    fn: (tests, [id]) => tests.find((test) => test.id === id)?.output || '',
  })

  return (
    <Input
      value={value}
      onChange={(e) => tests.outputChange({ id, value: e.target.value })}
      label='Пример выходных данных'
      multiline
    />
  )
})

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
