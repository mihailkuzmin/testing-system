import { Controller } from '../typings'
import * as controllers from '../controllers'

export const routes: Controller = (app, options, done) => {
  app.register(controllers.workController, { prefix: '/work' })
  app.register(controllers.studentController, { prefix: '/student' })
  app.register(controllers.taskController, { prefix: '/task' })
  app.register(controllers.groupController, { prefix: '/group' })
  app.register(controllers.authController, { prefix: '/auth' })

  done()
}
