import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { PageError, PageLoader } from '@components/Loaders'
import { userReport } from '@pages/UserReport/model'
import { WorkId } from '@common/typings/work'
import { UserId } from '@common/typings/user'
import { GroupId } from '@common/typings/group'
import { Task } from './Task'
import styles from './styles.module.css'

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

  const { isLoading, isFail } = useStore(userReport.page.status)
  const { tasksResults, completedTasksCount, selectedTaskId } = useStore(userReport.$tasks)
  const { work, tasksCount } = useStore(userReport.$work)
  const user = useStore(userReport.$user)

  const userName = `${user?.lastName} ${user?.firstName} ${user?.patronymic}`

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Card className={styles.page}>
      <h3>Отчет пользователя {userName}</h3>
      <h3>Работа "{work?.name}"</h3>
      <span>
        Выполнено заданий: {completedTasksCount} из {tasksCount}
      </span>
      <Divider />

      <div className={styles.tasksList}>
        {tasksResults.map((t, index) => (
          <Task
            key={t.id}
            number={index + 1}
            selected={selectedTaskId === t.id}
            taskName={t.taskName}
            testsPassed={t.testsPassed}
            testsCount={t.testsCount}
            onExpand={() => userReport.selectTask(t.id)}
            onCollapse={() => userReport.unselectTask()}
          />
        ))}
      </div>
    </Card>
  )
}
