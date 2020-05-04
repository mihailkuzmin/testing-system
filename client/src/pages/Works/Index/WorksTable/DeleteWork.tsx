import React from 'react'
import { useStore } from 'effector-react'
import { ConfirmationDialog } from '../../../../components'
import { worksTable } from '../../model/index/worksTable'

export const DeleteWork = () => {
  const isOpen = useStore(worksTable.$deleteDialogIsOpen)
  const work = useStore(worksTable.$selectedForDelete)

  return (
    <ConfirmationDialog
      open={isOpen}
      onConfirm={() => worksTable.confirmDelete()}
      onCancel={() => worksTable.cancelDelete()}
      title='Удалить работу'
      confirmText='Удалить'
    >
      <p>Вы уверены, что хотите удалить работу</p>
      <p>{work?.name}?</p>
    </ConfirmationDialog>
  )
}
