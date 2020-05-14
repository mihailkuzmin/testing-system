import { forward, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { TasksPage } from '../page'
import { getTasksFx, deleteTaskFx } from './effects'
import { $tasks, $taskForDelete } from './stores'
import { addTask, selectForDelete, cancelDelete, confirmDelete } from './events'

forward({ from: TasksPage.close, to: getTasksFx.cancel })
forward({ from: TasksPage.open, to: getTasksFx })
forward({ from: deleteTaskFx.done, to: getTasksFx })

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(TasksPage.close)

sample({
  source: $tasks,
  clock: selectForDelete,
  target: $taskForDelete,
  fn: (tasks, taskId) => tasks.find((task) => task.id === taskId) ?? null,
})

sample({
  source: $taskForDelete,
  clock: confirmDelete,
  target: deleteTaskFx,
  fn: (task) => task!.id,
})

$taskForDelete.reset(TasksPage.close, deleteTaskFx, cancelDelete)

const $deleteDialogIsOpen = $taskForDelete.map(Boolean)

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
  $deleteDialogIsOpen,
  confirmDelete,
  cancelDelete,
  selectForDelete,
  addTask,
}
