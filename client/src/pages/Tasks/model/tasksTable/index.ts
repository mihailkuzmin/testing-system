import { forward } from 'effector'
import { getTasksFx, deleteTaskFx } from './effects'
import { $tasks } from './stores'
import { deleteTask, editTask, addTask } from './events'
import { TasksPage } from '../page'
import { notifications } from '../../../../model'
import { MessageType } from '../../../../typings'

forward({ from: TasksPage.close, to: getTasksFx.cancel })
forward({ from: TasksPage.open, to: getTasksFx })

forward({ from: deleteTask, to: deleteTaskFx })
forward({ from: deleteTaskFx.done, to: getTasksFx })

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)

deleteTask.watch((taskId) => {
  notifications.createMessage({
    text: `Удаление задания ${taskId}`,
    type: MessageType.Info,
  })
})

editTask.watch((taskId) => console.log(`Edit task ${taskId}`))
addTask.watch(() => console.log('Add task'))

deleteTaskFx.doneData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Success })
})

export const tasksTable = {
  $tasks,
  deleteTask,
  editTask,
  addTask,
}
