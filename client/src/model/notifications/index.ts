import { $notifications } from './stores'
import {
  newMessage,
  createMessage,
  setDisplayed,
  removeMessage,
} from './events'

$notifications.on(newMessage, (state, message) => {
  return [...state, message]
})
$notifications.on(setDisplayed, (state, displayKey) => {
  return state.map((message) =>
    message.key === displayKey ? { ...message, displayed: true } : message,
  )
})
$notifications.on(removeMessage, (state, removeKey) => {
  return state.filter(({ key }) => key !== removeKey)
})

export const notifications = {
  $notifications,
  createMessage,
  removeMessage,
  setDisplayed,
}
