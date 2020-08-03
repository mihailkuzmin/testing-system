import React from 'react'
import { WorkId } from '@common/typings/work'
import { UserId } from '@common/typings/user'
import { GroupId } from '@common/typings/group'
import { userReport } from '@pages/UserReport/model'

type UserReportProps = {
  workId: WorkId
  userId: UserId
  groupId: GroupId
}

export const UserReport = (props: UserReportProps) => {
  React.useEffect(
    () =>
      userReport.page.onMount({
        workId: props.workId,
        userId: props.userId,
        groupId: props.groupId,
      }),
    [props.workId, props.userId, props.groupId],
  )

  return (
    <div>
      Work: {props.workId}, group: {props.groupId}, user: {props.userId}
    </div>
  )
}
