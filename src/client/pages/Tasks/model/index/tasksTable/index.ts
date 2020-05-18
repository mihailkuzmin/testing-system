import { combine, forward, guard, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { TasksPage } from '../page'
import { getTasksFx, getWorksWithTaskFx, deleteTaskFx } from './effects'
import { $tasks, $taskForDelete, $worksWithTask } from './stores'
import { addTask, selectForDelete, cancelDelete, confirmDelete, deleteTask } from './events'

forward({ from: TasksPage.close, to: getTasksFx.cancel })
forward({ from: TasksPage.open, to: getTasksFx })
forward({ from: deleteTaskFx.done, to: getTasksFx })
forward({ from: getWorksWithTaskFx.done, to: deleteTask })
forward({ from: cancelDelete, to: getWorksWithTaskFx.cancel })

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(TasksPage.close)

sample({
  source: $tasks,
  clock: selectForDelete,
  target: $taskForDelete,
  fn: (tasks, taskId) => tasks.find((task) => task.id === taskId) ?? null,
})
$taskForDelete.reset(TasksPage.close, deleteTaskFx, cancelDelete)

sample({
  source: $taskForDelete,
  clock: confirmDelete,
  target: getWorksWithTaskFx,
  fn: (task) => task!.id,
})

$worksWithTask.on(getWorksWithTaskFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload
  }
})
$worksWithTask.reset(TasksPage.close, deleteTaskFx, cancelDelete)

const $isIncludedToWork = $worksWithTask.map((works) => Boolean(works.length))
const $canDelete = combine(
  {
    isIncluded: $isIncludedToWork,
    isLoading: getWorksWithTaskFx.pending,
  },
  ({ isIncluded, isLoading }) => !(isIncluded || isLoading),
)

sample({
  source: $taskForDelete,
  clock: guard({ source: deleteTask, filter: $canDelete }),
  target: deleteTaskFx,
  fn: (task) => task!.id,
})

deleteTaskFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

deleteTaskFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})

deleteTaskFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const tasksTable = {
  $tasks,
  $taskForDelete,
  $deleteDialogIsOpen: $taskForDelete.map(Boolean),
  $deleteDialogIsLoading: getWorksWithTaskFx.pending,
  $isIncludedToWork,
  $worksWithTask,
  confirmDelete,
  cancelDelete,
  selectForDelete,
  addTask,
}
