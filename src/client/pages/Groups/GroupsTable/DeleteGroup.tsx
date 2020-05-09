import React from 'react'
import { useStore } from 'effector-react'
import { ConfirmationDialog } from '@components/ConfirmationDialog'
import { groupsTable } from '../model'

export const DeleteGroup = () => {
  const group = useStore(groupsTable.$selectedForDelete)
  const isOpen = useStore(groupsTable.$deleteDialogIsOpen)

  return (
    <ConfirmationDialog
      open={isOpen}
      onConfirm={() => groupsTable.confirmDelete()}
      onCancel={() => groupsTable.cancelDelete()}
      title='Удалить группу'
      confirmText='Удалить'
    >
      <p>Вы уверены, что хотите удалить группу {group?.name}?</p>
      <p>Также будут удалены все студенты этой группы</p>
    </ConfirmationDialog>
  )
}
