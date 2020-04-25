import React from 'react'
import { useStore } from 'effector-react'
import { PageLoader, PageError } from '../../../components/Loaders'
import { PreviewPage, task } from '../model/taskPreview'

type TaskPreviewProps = {
  id: number
}

export const TaskPreview = ({ id }: TaskPreviewProps) => {
  React.useEffect(() => PreviewPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(PreviewPage.$status)
  const kekTask = useStore(task.$task)

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <div>
      <p>Task {kekTask?.name} preview</p>
      <div dangerouslySetInnerHTML={{ __html: kekTask?.description ?? '' }}></div>
    </div>
  )
}
