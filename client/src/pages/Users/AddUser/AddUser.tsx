import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { MappedSelect, Item } from '../../../components/MappedSelect'
import { MappedInput } from '../../../components'
import { $groups, closeAddModal, $addForm, fieldValueChange } from '../model'
import styles from './AddUser.module.css'
import { AddForm } from '../model/typings'

export const AddUser = () => {
  const groups = useStore($groups)

  return (
    <div className={styles.addUser}>
      <form noValidate autoComplete='off'>
        <h3 className={styles.title}>Добавить пользователя</h3>
        <div className={styles.fields}>
          <MappedInput<AddForm>
            name='name'
            label='ФИО'
            store={$addForm}
            onChange={fieldValueChange}
          />
          <MappedSelect<AddForm>
            name='group'
            label='Группа'
            store={$addForm}
            onChange={fieldValueChange}
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
            store={$addForm}
            onChange={fieldValueChange}
          />
          <MappedInput<AddForm>
            name='password'
            label='Пароль'
            store={$addForm}
            onChange={fieldValueChange}
          />
        </div>
        <div className={styles.actions}>
          <PrimaryButton onClick={closeAddModal}>Добавить</PrimaryButton>
          <SecondaryButton onClick={closeAddModal}>Отменить</SecondaryButton>
        </div>
      </form>
    </div>
  )
}
