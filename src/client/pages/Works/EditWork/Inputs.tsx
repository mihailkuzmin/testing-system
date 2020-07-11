import React from 'react'
import { useStore } from 'effector-react'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import { Input } from '@components/Inputs'
import { editForm } from '@pages/Works/model/editWork'

export const NameInput = () => {
  const value = useStore(editForm.$name)

  return (
    <Input
      label='Название работы'
      value={value}
      onChange={(e) => editForm.nameChange(e.target.value)}
    />
  )
}

export const OpenDateInput = () => {
  const value = useStore(editForm.$openAt)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        ampm={false}
        label='Открытие'
        inputVariant='outlined'
        value={value}
        format='dd.LL.yyyy HH:mm'
        onChange={(date) => editForm.openAtChange(date as Date)}
      />
    </MuiPickersUtilsProvider>
  )
}

export const CloseDateInput = () => {
  const value = useStore(editForm.$closeAt)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        ampm={false}
        label='Закрытие'
        inputVariant='outlined'
        value={value}
        format='dd.LL.yyyy HH:mm'
        onChange={(date) => editForm.closeAtChange(date as Date)}
      />
    </MuiPickersUtilsProvider>
  )
}

export const TimeToCompleteInput = () => {
  const value = useStore(editForm.$timeToComplete)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        ampm={false}
        label='Время на выполнение'
        inputVariant='outlined'
        value={value}
        onChange={(date) => editForm.timeToCompleteChange(date as Date)}
      />
    </MuiPickersUtilsProvider>
  )
}
