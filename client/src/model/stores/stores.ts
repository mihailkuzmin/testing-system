import { createStore } from 'effector'
import * as states from './initialStates'
import { Message } from '../../typings'

export const $isAuth = createStore<boolean>(states.isAuth)

export const $messages = createStore<Message[]>(states.messages)
