import React from 'react'
import { PrimaryButton as Button } from '@components/Buttons'
import { UserId } from '@common/typings/user'
import { WorkId } from '@common/typings/work'
import { GroupId } from '@common/typings/group'
import styles from './styles.module.css'

type UserProps = {
  userId: UserId
  workId: WorkId
  groupId: GroupId
  number: number
  name: string
}

export const User = (props: UserProps) => {
  return (
    <div className={styles.user}>
      <div>{props.number}.</div>
      <div>{props.name}</div>
      <a
        href={`/report/work/${props.workId}/group/${props.groupId}/user/${props.userId}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button>Просмотреть</Button>
      </a>
    </div>
  )
}
