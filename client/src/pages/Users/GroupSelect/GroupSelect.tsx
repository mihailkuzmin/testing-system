// @ts-nocheck
import React from 'react'
import { useStoreMap } from 'effector-react'
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { $addFormValues, valueChange } from '../model'
import { AddForm, Group } from '../model/typings'

interface IGroupSelectProps {
  name: keyof AddForm
  label?: string
  items?: Group[]
}

const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
  const newValue = {
    currentTarget: {
      name: e.target.name,
      value: e.target.value,
    },
  }

  valueChange(newValue)
}

export const GroupSelect = ({ name, label, items }: IGroupSelectProps) => {
  const value = useStoreMap({
    store: $addFormValues,
    keys: [name],
    fn: (values) => values[name],
  })

  console.log(`${name} rerendered`)

  return (
    <FormControl variant='outlined'>
      <InputLabel id='group-select-label'>{label}</InputLabel>
      <Select
        name={name}
        labelId='group-select'
        id='group-select'
        value={value}
        onChange={handleChange}
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
