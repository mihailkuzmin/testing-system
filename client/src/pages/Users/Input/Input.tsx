import React from 'react'
import { useStoreMap } from 'effector-react'
import { TextField } from '@material-ui/core'
import { $addFormValues, fieldValueChange } from '../model'
import { AddForm } from '../model/typings'

interface IMappedInput {
  name: keyof AddForm
  label: string
}

export const Input = ({ name, label }: IMappedInput) => {
  const value = useStoreMap({
    store: $addFormValues,
    keys: [name],
    fn: (values) => values[name],
  })

  return (
    <TextField
      name={name}
      label={label}
      variant='outlined'
      value={value}
      onChange={fieldValueChange}
    />
  )
}
