import React from 'react'
import { useStoreMap } from 'effector-react'
import { addForm } from '@pages/Tasks/model/addTask'
import { Input } from '@components/Inputs'
import { CreateTestId } from '@common/typings/task'

type TestOutputProps = { id: CreateTestId }

export const TestOutput = ({ id }: TestOutputProps) => {
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
