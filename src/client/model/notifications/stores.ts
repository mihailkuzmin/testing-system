import { createStore } from 'effector'
import { Message } from '@typings'

export const messages: Message[] = []

export const $notifications = createStore(messages)
