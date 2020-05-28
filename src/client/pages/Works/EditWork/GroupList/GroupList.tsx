import React from 'react'
import { useStore } from 'effector-react'
import { PlusButton as Add, DeleteButton as Delete } from '@components/Buttons'
import { editForm } from '../../model/editWork'
import styles from './GroupList.module.css'

export const GroupList = () => {
  const { groups, selected } = useStore(editForm.$groups)

  return (
    <div className={styles.list}>
      <div>
        <span>Выбранные группы:</span>
        {selected.map((group) => (
          <div key={group.id} className={styles.group}>
            <span>{group.name}</span>
            <Delete onClick={() => editForm.removeGroup(group.id)} />
          </div>
        ))}
      </div>
      <div>
        <span>Все группы:</span>
        {groups.map((group) => (
          <div key={group.id} className={styles.group}>
            <span>{group.name}</span>
            <Add onClick={() => editForm.addGroup(group.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}
