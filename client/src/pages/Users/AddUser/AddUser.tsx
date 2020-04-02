import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { MappedSelect, Item } from '../../../components/MappedSelect'
import { MappedInput } from '../../../components'
import { Linear } from '../../../components/Loaders'
import { AddForm } from '../model/addForm/typings'
import { addForm, addModal } from '../model'
import { Status as S } from '../../../typings'
import styles from './AddUser.module.css'

const getGroupSelectLabel = (status: S) => {
  switch (status) {
    case S.Pending:
      return 'Загружаем список групп'
    case S.Fail:
      return 'Ошибка'
    case S.Done:
      return 'Группа'
    default:
      return ''
  }
}

export const AddUser = () => {
  const groups = useStore(addForm.$groups)
  const createUserStatus = useStore(addForm.$createUserStatus)
  const groupsSelectStatus = useStore(addForm.$getAllGroupsStatus)

  const buttonsAreHidden = createUserStatus === S.Pending
  const addButtonDisabled = [S.Pending, S.Fail].includes(groupsSelectStatus)
  const groupSelectDisabled = addButtonDisabled
  const groupSelectLabel = getGroupSelectLabel(groupsSelectStatus)

  return (
    <div className={styles.addUser}>
      <form noValidate autoComplete='off'>
        <h3 className={styles.title}>Добавить пользователя</h3>
        <div className={styles.fields}>
          <MappedInput<AddForm>
            name='name'
            label='ФИО'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
          <MappedSelect<AddForm>
            name='group'
            label={groupSelectLabel}
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
            disabled={groupSelectDisabled}
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
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
          <MappedInput<AddForm>
            name='password'
            label='Пароль'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
        </div>
        {buttonsAreHidden ? (
          <div className={styles.loader}>
            <Linear />
          </div>
        ) : (
          <div className={styles.actions}>
            <PrimaryButton
              disabled={addButtonDisabled}
              onClick={addForm.createUser}
            >
              Добавить
            </PrimaryButton>
            <SecondaryButton onClick={addModal.closeAddModal}>
              Отменить
            </SecondaryButton>
          </div>
        )}
      </form>
    </div>
  )
}
