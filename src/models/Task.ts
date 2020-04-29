import { db } from '../db'
import { ITask, CreateTask, UpdateTask, TaskId } from '../typings/task'

export class Task {
  static async getById(id: TaskId) {
    const [result] = await db.query(
      `
        SELECT
          T.id, T.name, T.description
        FROM Task T
        WHERE (T.id = %L)
      `,
      id,
    )
    return result
  }

  static async getTestsById(id: TaskId) {
    const tests = await db.query(
      `
        SELECT
          T.id, T.input, T.output
        FROM Test T
        WHERE (T.task_id = %L)
        ORDER BY T.id 
      `,
      id,
    )
    return tests
  }

  static async getAll(): Promise<ITask[]> {
    const result = await db.query(`
        SELECT
          T.id, T.name, T.description
        FROM Task T
        ORDER BY T.id
      `)
    return result
  }

  static async create(t: CreateTask): Promise<ITask> {
    const [task] = await db.query(
      `
        INSERT INTO Task as T (
          name,
          description
        ) VALUES (%L)
        RETURNING
          T.id, T.description
      `,
      [t.name, t.description],
    )

    const tests = t.tests.map((test) => [task.id, ...Object.values(test)])
    await db.query(`INSERT INTO Test as T (task_id, input, output) VALUES %L`, tests)

    return task
  }

  static async update(t: UpdateTask): Promise<ITask> {
    const updateTaskQuery = db.createQueryString(
      `
        UPDATE Task T
        SET
          name = %L,
          description = %L
        WHERE (T.id = %L)
        RETURNING
          T.id, T.name, T.description
      `,
      t.name,
      t.description,
      t.id,
    )

    const [task] = await db.query(updateTaskQuery)

    if (t.editTests) {
      const forUpdate = t.testsForUpdate.map(({ id, input, output }) =>
        Object.values({ id, input, output }),
      )

      const forInsert = t.testsForInsert.map(({ input, output }) =>
        Object.values({ id: t.id, input, output }),
      )

      const forDelete = t.testsForDelete
      const updateTestsQuery = db.createQueryString(
        `
       UPDATE Test T
        SET
          input = kek.input,
          output = kek.output
        FROM
          (VALUES %L) as kek(id, input, output)
        WHERE T.id = CAST (kek.id as INT)`,
        forUpdate,
      )

      const insertTestsQuery = db.createQueryString(
        `INSERT INTO Test (task_id, input, output) VALUES %L`,
        forInsert,
      )

      const deleteTestsQuery = db.createQueryString(
        `
        DELETE FROM Test as T
        WHERE (T.id in (%L))
        `,
        forDelete,
      )

      const queries = []

      if (forInsert.length) {
        queries.push(insertTestsQuery)
      }
      if (forUpdate.length) {
        queries.push(updateTestsQuery)
      }
      if (forDelete.length) {
        queries.push(deleteTestsQuery)
      }

      await Promise.all(queries.map((q) => db.query(q)))
    }

    return task
  }

  static async removeById(id: TaskId): Promise<ITask> {
    const [task] = await db.query(
      `
        DELETE FROM Task as T
        WHERE (T.id = %L)
        RETURNING
          T.id, T.name, T.description
      `,
      id,
    )
    return task
  }
}
