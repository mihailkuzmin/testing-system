import { createEvent } from 'effector'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

export const GroupsPage = { open, close, onMount }
