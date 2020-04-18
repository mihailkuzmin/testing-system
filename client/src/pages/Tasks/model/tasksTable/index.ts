import { forward, sample } from 'effector'
import { getTasksFx, deleteTaskFx } from './effects'
import { $tasks, $selectedForDelete as $taskForDelete } from './stores'
import {
  editTask,
  addTask,
  selectForDelete,
  cancelDelete,
  confirmDelete,
} from './events'
import { TasksPage } from '../page'
import { notifications } from '../../../../model'
import { MessageType } from '../../../../typings'

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
    notifications.createMessage({
      text: `Удаление задания ${task.id}`,
      type: MessageType.Info,
    })
  }
})
$taskForDelete.reset(TasksPage.close, deleteTaskFx, cancelDelete)

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
  editTask,
  addTask,
}
