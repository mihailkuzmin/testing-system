import React from 'react'
import { useStore } from 'effector-react'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Input } from '@components/Inputs'
import { addForm } from '@pages/Works/model/addWork'

export const NameInput = () => {
  const value = useStore(addForm.$name)

  return (
    <Input
      label='Название работы'
      value={value}
      onChange={(e) => addForm.nameChange(e.target.value)}
    />
  )
}

export const OpenDateInput = () => {
  const value = useStore(addForm.$openAt)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        ampm={false}
        label='Открытие'
        inputVariant='outlined'
        value={value}
        format='dd.LL.yyyy HH:mm'
        onChange={(date) => addForm.openAtChange(date as Date)}
      />
    </MuiPickersUtilsProvider>
  )
}

export const CloseDateInput = () => {
  const value = useStore(addForm.$closeAt)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        ampm={false}
        label='Закрытие'
        inputVariant='outlined'
        value={value}
        format='dd.LL.yyyy HH:mm'
        onChange={(date) => addForm.closeAtChange(date as Date)}
      />
    </MuiPickersUtilsProvider>
  )
}
