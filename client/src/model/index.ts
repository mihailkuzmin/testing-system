import { $messages, $isAuth } from './stores'
import {
  newMessage,
  createMessage,
  setDisplayed,
  removeMessage,
} from './events'

$messages.on(newMessage, (state, message) => {
  return [...state, message]
})
$messages.on(setDisplayed, (state, displayKey) => {
  return state.map((message) =>
    message.key === displayKey ? { ...message, displayed: true } : message,
  )
})
$messages.on(removeMessage, (state, removeKey) => {
  return state.filter(({ key }) => key !== removeKey)
})

// export public api
export const app = {
  $messages,
  $isAuth,
  createMessage,
  removeMessage,
  setDisplayed,
}
