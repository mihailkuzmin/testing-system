import React from 'react'
import { useSnackbar } from 'notistack'
import { useStore } from 'effector-react'
import { notifications as Notifications } from '@model'

export const Notifier = () => {
  const notifications = useStore(Notifications.$notifications)
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    notifications.forEach(({ key, message, options, displayed }) => {
      if (displayed) {
        return
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (_, key) => Notifications.removeMessage(key as string),
      })

      Notifications.setDisplayed(key)
    })
  }, [notifications, enqueueSnackbar])

  return null
}
