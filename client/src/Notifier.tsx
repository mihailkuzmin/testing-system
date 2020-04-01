import React from 'react'
import { useSnackbar } from 'notistack'
import { useStore } from 'effector-react'
import { stores, events } from './model'

export const Notifier = () => {
  const notifications = useStore(stores.$messages)
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    notifications.forEach(({ key, message, options, displayed }) => {
      if (displayed) {
        return
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (_, key) => events.removeMessage(key),
      })

      events.setDisplayed(key)
    })
  }, [notifications, enqueueSnackbar])

  return null
}
