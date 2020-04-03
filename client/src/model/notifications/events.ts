import { createEvent } from 'effector'
import { NewMessage, Message } from '../../typings'
import { nanoid } from 'nanoid'

export const createMessage = createEvent<NewMessage>()
export const messageWithText = createMessage.filter({
  fn: (message) => Boolean(message.text),
})
export const newMessage = messageWithText.map<Message>(({ type, text }) => {
  return {
    key: nanoid(),
    message: text,
    options: {
      autoHideDuration: 2000,
      disableWindowBlurListener: true,
      variant: type,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    },
    displayed: false,
  }
})

export const setDisplayed = createEvent<string>()
export const removeMessage = createEvent<string>()
