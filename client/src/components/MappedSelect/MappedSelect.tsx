import React from 'react'
import { Store } from 'effector'
import { useStoreMap } from 'effector-react'
import {
  Select as MaterialSelect,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'

export { MenuItem as Item }

interface IMappedSelectProps<T> {
  name: keyof T & string
  store: Store<T>
  label?: string
  className?: string
  onChange: any
  children?: React.ReactNode
}

export const MappedSelect = <T extends {}>(props: IMappedSelectProps<T>) => {
  const value = useStoreMap({
    store: props.store,
    keys: [props.name],
    fn: (values) => values[props.name],
  })

  return (
    <FormControl variant='outlined'>
      <InputLabel id={`${props.name}-select-label`}>{props.label}</InputLabel>
      <MaterialSelect
        name={props.name}
        labelId={`${props.name}-select`}
        id={`${props.name}-select`}
        value={value}
        onChange={props.onChange}
        label={props.label}
      >
        <MenuItem disabled value=''>
          {props.label}
        </MenuItem>
        {props.children}
      </MaterialSelect>
    </FormControl>
  )
}
