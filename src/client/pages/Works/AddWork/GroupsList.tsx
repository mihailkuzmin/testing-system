import React from 'react'
import { useStore } from 'effector-react'
import { PlusButton as Add, DeleteButton as Delete } from '@components/Buttons'
import { addForm } from '../model/addWork'
import styles from './AddWork.module.css'

export const GroupsList = () => {
  const { groups, selected } = useStore(addForm.$groups)

  return (
    <div className={styles.groupsList}>
      <div>
        <span>Выбранные группы:</span>
        {selected.map((group) => (
          <div key={group.id} className={styles.group}>
            <span>{group.name}</span>
            <Delete onClick={() => addForm.removeGroup(group.id)} />
          </div>
        ))}
      </div>
      <div>
        <span>Все группы:</span>
        {groups.map((group) => (
          <div key={group.id} className={styles.group}>
            <span>{group.name}</span>
            <Add onClick={() => addForm.addGroup(group.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}
