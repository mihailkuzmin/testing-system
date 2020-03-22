import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'

// TODO: remove 'any'
interface IGroupSelectProps {
  placeholder?: string
  items?: any[]
}

export const GroupSelect = ({ placeholder, items }: IGroupSelectProps) => {
  return (
    <FormControl variant='outlined'>
      <InputLabel id='group-select-label'>{placeholder}</InputLabel>
      <Select labelId='group-select' id='group-select' value='' label={placeholder}>
        <MenuItem disabled value=''>
          {placeholder}
        </MenuItem>
        {items?.map((i) => (
          <MenuItem key={i}>{i}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
