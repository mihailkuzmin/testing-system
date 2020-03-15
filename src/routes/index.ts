import { IController } from '../typings/controller'
import * as controllers from '../controllers'

export const routes: IController = (app, options, done) => {
  app.register(controllers.workController, { prefix: '/work' })
  app.register(controllers.studentController, { prefix: '/student' })
  app.register(controllers.taskController, { prefix: '/task' })
  app.register(controllers.groupController, { prefix: '/group' })

  done()
}
