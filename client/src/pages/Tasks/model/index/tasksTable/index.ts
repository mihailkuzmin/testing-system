import { forward, sample } from 'effector'
import { getTasksFx, deleteTaskFx } from './effects'
import { $tasks, $taskForDelete } from './stores'
import { selectForEdit, addTask, selectForDelete, cancelDelete, confirmDelete } from './events'
import { TasksPage } from '../page'
import { notifications } from '../../../../../model'
import { MessageType } from '../../../../../typings'

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

$taskForDelete.watch(confirmDelete, (task) => {
  if (task !== null) {
    deleteTaskFx(task.id)
  }
})
$taskForDelete.reset(TasksPage.close, deleteTaskFx, cancelDelete)

deleteTaskFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

deleteTaskFx.doneData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Success })
})

deleteTaskFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const tasksTable = {
  $tasks,
  $taskForDelete,
  confirmDelete,
  cancelDelete,
  selectForDelete,
  selectForEdit,
  addTask,
}
