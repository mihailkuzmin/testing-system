import React from 'react'
import {
  FormControl,
  Select as MaterialSelect,
  MenuItem,
} from '@material-ui/core'
export { MenuItem as Item }

interface ISelectProps {
  name: string
  label?: string
  className?: string
  onChange: any
  value: any
  minWidth?: string
  children?: React.ReactNode
}

export const GroupSelect = (props: ISelectProps) => {
  return (
    <FormControl>
      <MaterialSelect
        name={props.name}
        labelId={`${props.name}-select`}
        id={`${props.name}-select`}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
        style={{ minWidth: props.minWidth }}
      >
        {props.children}
      </MaterialSelect>
    </FormControl>
  )
}
