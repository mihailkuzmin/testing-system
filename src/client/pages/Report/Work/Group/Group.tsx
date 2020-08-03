import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { IconButton } from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'
import { Circular } from '@components/Loaders'
import { report } from '@pages/Report/model'
import { User } from './User'
import styles from './styles.module.css'

type GroupProps = {
  number: number
  name: string
  selected: boolean
  onOpen: () => void
  onClose: () => void
}

export const Group = (props: GroupProps) => {
  const { users, isLoading } = useStore(report.users.$users)
  const { selectedWorkId } = useStore(report.works.$works)
  const { selectedGroupId } = useStore(report.groups.$groups)

  return (
    <Card className={styles.group}>
      <div className={styles.header}>
        <div>{props.number}.</div>
        <div>{props.name}</div>
        {props.selected ? (
          <IconButton onClick={props.onClose}>
            <ExpandLess />
          </IconButton>
        ) : (
          <IconButton onClick={props.onOpen}>
            <ExpandMore />
          </IconButton>
        )}
      </div>
      {props.selected && (
        <div className={styles.usersList}>
          <Divider />
          <div className={styles.users}>
            <span>Выберите пользователя:</span>
            {isLoading ? (
              <div className={styles.loader}>
                <Circular />
              </div>
            ) : (
              <div className={styles.list}>
                {users.map((u, index) => {
                  const name = `${u.lastName} ${u.firstName} ${u.patronymic}`
                  const number = index + 1

                  return (
                    <React.Fragment key={u.id}>
                      <User
                        userId={u.id}
                        workId={selectedWorkId!}
                        groupId={selectedGroupId!}
                        number={number}
                        name={name}
                      />
                      {number !== users.length && <Divider />}
                    </React.Fragment>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
