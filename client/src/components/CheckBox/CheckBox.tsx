import React from 'react'
import { FormControlLabel, Checkbox, CheckboxProps } from '@material-ui/core'

interface ICheckboxProps extends Omit<CheckboxProps, 'onChange'> {
  onChange: any
  label?: string
}

export const CheckBox = (props: ICheckboxProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workaround = {
      target: {
        name: e.target.name,
        value: e.target.checked,
      },
    }
    props.onChange(workaround)
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={onChange}
          name={props.name}
          color='primary'
        />
      }
      label={props.label}
    />
  )
}
