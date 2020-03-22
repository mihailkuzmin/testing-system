import React from 'react'
import { Button } from '@material-ui/core'

interface IAddButtonProps {
  onClick: () => void
}

export const AddButton = ({ onClick }: IAddButtonProps) => {
  return (
    <Button variant='outlined' color='primary' onClick={onClick}>
      Добавить
    </Button>
  )
}
