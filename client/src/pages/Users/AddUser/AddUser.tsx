import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { MappedSelect, Item } from '../../../components/MappedSelect'
import { Linear } from '../../../components/Loaders'
import { MappedInput } from '../../../components'
import { AddForm } from '../model/typings'
import { users } from '../model'
import { Status } from '../../../typings'
import styles from './AddUser.module.css'

export const AddUser = () => {
  const groups = useStore(users.$groups)
  const createUserStatus = useStore(users.$createUserStatus)

  return (
    <div className={styles.addUser}>
      <form noValidate autoComplete='off'>
        <h3 className={styles.title}>Добавить пользователя</h3>
        <div className={styles.fields}>
          <MappedInput<AddForm>
            name='name'
            label='ФИО'
            store={users.$addForm}
            onChange={users.fieldValueChange}
          />
          <MappedSelect<AddForm>
            name='group'
            label='Группа'
            store={users.$addForm}
            onChange={users.fieldValueChange}
          >
            {groups.map(({ id, name }) => (
              <Item key={id} value={id}>
                {name}
              </Item>
            ))}
          </MappedSelect>
          <MappedInput<AddForm>
            name='login'
            label='Логин'
            store={users.$addForm}
            onChange={users.fieldValueChange}
          />
          <MappedInput<AddForm>
            name='password'
            label='Пароль'
            store={users.$addForm}
            onChange={users.fieldValueChange}
          />
        </div>
        {createUserStatus === Status.Pending ? (
          <div className={styles.loader}>
            <Linear />
          </div>
        ) : (
          <div className={styles.actions}>
            <PrimaryButton onClick={users.createUser}>Добавить</PrimaryButton>
            <SecondaryButton onClick={users.closeAddModal}>
              Отменить
            </SecondaryButton>
          </div>
        )}
      </form>
    </div>
  )
}
