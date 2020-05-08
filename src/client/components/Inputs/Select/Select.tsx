import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectProps,
} from '@material-ui/core'

export { MenuItem as Item }

export const Select = (props: SelectProps) => {
  return (
    <FormControl variant={props.variant ?? 'outlined'}>
      <InputLabel id={`${props.name}-select-label`}>{props.label}</InputLabel>
      <MaterialSelect
        {...props}
        variant={props.variant ?? 'outlined'}
        labelId={`${props.name}-select`}
        id={`${props.name}-select`}
      >
        <MenuItem disabled>{props.label}</MenuItem>
        {props.children}
      </MaterialSelect>
    </FormControl>
  )
}
