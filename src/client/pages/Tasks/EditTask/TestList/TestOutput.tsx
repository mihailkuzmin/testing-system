import React from 'react'
import { useStoreMap } from 'effector-react'
import { Input } from '@components/Inputs'
import { tests } from '@pages/Tasks/model/editTask'
import { CreateTestId } from '@common/typings/task'

type TestOutputProps = { id: CreateTestId }

export const TestOutput = React.memo(({ id }: TestOutputProps) => {
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
