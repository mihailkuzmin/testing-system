import React from 'react'
import { useSnackbar } from 'notistack'
import { useStore } from 'effector-react'
import { app } from './model'

export const Notifier = () => {
  const notifications = useStore(app.$messages)
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    notifications.forEach(({ key, message, options, displayed }) => {
      if (displayed) {
        return
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (_, key) => app.removeMessage(key as string),
      })

      app.setDisplayed(key)
    })
  }, [notifications, enqueueSnackbar])

  return null
}
