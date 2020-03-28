// @ts-nocheck
import React from 'react'
import { useStoreMap } from 'effector-react'
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { $addFormValues, fieldValueChange } from '../../model'
import { AddForm, Group } from '../../model/typings'

interface IGroupSelectProps {
  name: keyof AddForm
  label?: string
  items?: Group[]
}

export const GroupSelect = ({ name, label, items }: IGroupSelectProps) => {
  const value = useStoreMap({
    store: $addFormValues,
    keys: [name],
    fn: (values) => values[name],
  })

  return (
    <FormControl variant='outlined'>
      <InputLabel id='group-select-label'>{label}</InputLabel>
      <Select
        name={name}
        labelId='group-select'
        id='group-select'
        value={value}
        onChange={fieldValueChange}
        label={label}
      >
        <MenuItem disabled value=''>
          {label}
        </MenuItem>
        {items?.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
