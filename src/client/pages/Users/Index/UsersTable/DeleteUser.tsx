import React from 'react'
import { useStore } from 'effector-react'
import { usersTable } from '@pages/Users/model/index'
import { ConfirmationDialog } from '@components/ConfirmationDialog'

export const DeleteUser = () => {
  const isOpen = useStore(usersTable.$deleteDialogIsOpen)
  const user = useStore(usersTable.$selectedForDelete)

  return (
    <ConfirmationDialog
      open={isOpen}
      onConfirm={() => usersTable.confirmDelete()}
      onCancel={() => usersTable.cancelDelete()}
      title='Удалить пользователя'
      confirmText='Удалить'
    >
      <p>Вы уверены, что хотите удалить пользователя</p>
      <p>
        {user?.lastName} {user?.firstName} {user?.patronymic}?
      </p>
    </ConfirmationDialog>
  )
}
