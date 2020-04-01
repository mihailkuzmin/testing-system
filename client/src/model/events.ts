import { createEvent } from 'effector'
import { NewMessage, Message } from '../typings'
import { nanoid } from 'nanoid'

export const newMessage = createEvent<Message>()

export const createMessage = newMessage.prepend(
  ({ type, text }: NewMessage) => {
    return {
      key: nanoid(),
      message: text,
      options: {
        autoHideDuration: 2000,
        disableWindowBlurListener: true,
        variant: type,
      },
      displayed: false,
    }
  },
)

export const setDisplayed = createEvent<string>()
export const removeMessage = createEvent<any>()
