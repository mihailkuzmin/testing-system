import React from 'react'
import { useStoreMap } from 'effector-react'
import { addForm } from '@pages/Tasks/model/addTask'
import { Input } from '@components/Inputs'
import { CreateTestId } from '@common/typings/task'

type TestInputProps = { id: CreateTestId }

export const TestInput = ({ id }: TestInputProps) => {
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
