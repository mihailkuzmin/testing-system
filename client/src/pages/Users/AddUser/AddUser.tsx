import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton, SecondaryButton } from '../../../components'
import { Input } from './Input'
import { GroupSelect } from './GroupSelect'
import { $groups, closeAddModal } from '../model'
import styles from './AddUser.module.css'

export const AddUser = () => {
  const groups = useStore($groups)

  return (
    <div className={styles.addUser}>
      <form noValidate autoComplete='off'>
        <h3 className={styles.title}>Добавить пользователя</h3>
        <div className={styles.fields}>
          <Input name='name' label='ФИО' />
          <GroupSelect name='group' label='Группа' items={groups} />
          <Input name='login' label='Логин' />
          <Input name='password' label='Пароль' />
        </div>
        <div className={styles.actions}>
          <PrimaryButton onClick={closeAddModal}>Добавить</PrimaryButton>
          <SecondaryButton onClick={closeAddModal}>Отменить</SecondaryButton>
        </div>
      </form>
    </div>
  )
}
