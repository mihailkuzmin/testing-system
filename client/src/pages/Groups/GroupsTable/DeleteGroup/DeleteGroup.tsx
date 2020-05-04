import React from 'react'
import { useStore } from 'effector-react'
import { groupsTable } from '../../model'
import { ConfirmationDialog } from '../../../../components/ConfirmationDialog'

export const DeleteGroup = () => {
  const group = useStore(groupsTable.$selectedForDelete)
  const isOpen = useStore(groupsTable.$deleteDialogIsOpen)

  return (
    <ConfirmationDialog
      open={isOpen}
      onConfirm={() => groupsTable.confirmDelete()}
      onCancel={() => groupsTable.cancelDelete()}
      title='Удалить группу'
    >
      <p>Вы уверены, что хотите удалить группу</p>
      <p>{group?.name}?</p>
      <p>Также будут удалены все студенты этой группы</p>
    </ConfirmationDialog>
  )
}
