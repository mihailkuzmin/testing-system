import React from 'react'
import { useStore } from 'effector-react'
import { tasksTable } from '../../model/index'
import { ConfirmationDialog } from '../../../../components/ConfirmationDialog'

export const DeleteTask = () => {
  const isOpen = useStore(tasksTable.$deleteDialogIsOpen)

  return (
    <ConfirmationDialog
      open={isOpen}
      onConfirm={() => tasksTable.confirmDelete()}
      onCancel={() => tasksTable.cancelDelete()}
      title='Удалить задание'
      confirmText='Удалить'
    >
      <p>Вы уверены, что хотите удалить задание?</p>
    </ConfirmationDialog>
  )
}
