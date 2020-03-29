import React from 'react'
import { Store } from 'effector'
import { useStoreMap } from 'effector-react'
import { TextField } from '@material-ui/core'

// T is your form interface
// name - one of form fields

interface Mapped<T> {
  name: keyof T & string
  label: string
  store: Store<T>
  onChange: any
  className?: string
}

export const MappedInput = <T extends {}>(props: Mapped<T>) => {
  const value = useStoreMap({
    store: props.store,
    keys: [props.name],
    fn: (values) => values[props.name],
  })

  return (
    <TextField
      name={props.name}
      label={props.label}
      variant='outlined'
      value={value}
      onChange={props.onChange}
      className={props.className}
    />
  )
}
