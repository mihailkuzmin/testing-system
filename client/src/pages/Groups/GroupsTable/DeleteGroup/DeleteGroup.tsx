import React from 'react'
import { useStore } from 'effector-react'
import {
  PrimaryButton as Confirm,
  SecondaryButton as Cancel,
} from '../../../../components/Buttons'
import { groupsTable } from '../../model'
import styles from './DeleteGroup.module.css'

export const DeleteGroup = () => {
  const group = useStore(groupsTable.$selectedForDelete)

  return (
    <div className={styles.deleteGroup}>
      <h3 className={styles.title}>Удалить группу</h3>
      <p>Вы уверены, что хотите удалить группу {group?.name} ?</p>
      <p>Также будут удалены все студенты этой группы</p>
      <div className={styles.actions}>
        <Confirm onClick={groupsTable.confirmDelete}>Удалить</Confirm>
        <Cancel onClick={groupsTable.cancelDelete}>Отмена</Cancel>
      </div>
    </div>
  )
}
