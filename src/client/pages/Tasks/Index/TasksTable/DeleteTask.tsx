import React from 'react'
import { useStore } from 'effector-react'
import { Circular } from '@components/Loaders'
import { ConfirmationDialog } from '@components/ConfirmationDialog'
import { tasksTable } from '../../model/index'

export const DeleteTask = () => {
  const { isOpen, isLoading, isIncluded, worksWithTask } = useStore(tasksTable.$deleteDialog)

  if (isLoading) {
    return (
      <ConfirmationDialog
        open={isOpen}
        onCancel={() => tasksTable.cancelDelete()}
        title='Проверка'
        cancelIsNotNegative
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Circular />
          <p>Загрузка</p>
        </div>
      </ConfirmationDialog>
    )
  }

  if (isIncluded) {
    return (
      <ConfirmationDialog
        open={isOpen}
        onCancel={() => tasksTable.cancelDelete()}
        cancelIsNotNegative
        title='Невозможно удалить задание'
        cancelText='Понятно'
      >
        <p>Невозможно удалить задание, так как оно включено в следующие работы:</p>
        <ol style={{ maxWidth: '70%', margin: 'auto', wordBreak: 'break-all' }}>
          {worksWithTask.map((work) => (
            <li key={work.id}>{work.name}</li>
          ))}
        </ol>
        <p>Удалите задание из работ и повторите попытку</p>
      </ConfirmationDialog>
    )
  }

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
