import { db } from '@db'
import { Task, CreateTask, UpdateTask, TaskId, Topic, Test } from '@common/typings/task'

export class TaskRepository {
  static async getById(id: TaskId): Promise<Task> {
    const [task] = await db.query(
      `
        SELECT
          T.id, T.name, T.description, jsonb_build_object('id', Topic.id, 'name', Topic.name) as topic,
          (
            SELECT array(SELECT
              jsonb_build_object('id', Test.id, 'input', Test.input, 'output', Test.output)
            FROM Test
            WHERE Test.task_id = T.id)
          ) as tests
        FROM Task T, TaskTopic Topic
        WHERE (T.id = %L and  T.topic_id = Topic.id)
      `,
      id,
    )

    return task
  }

  static async getTestsById(id: TaskId): Promise<Test[]> {
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

  static async getTopics(): Promise<Topic[]> {
    const topics = await db.query(`SELECT T.id, T.name FROM TaskTopic T ORDER BY T.name`)
    return topics
  }

  static async getAll(): Promise<Task[]> {
    const tasks = await db.query(`
      SELECT
        T.id, T.name, T.description, jsonb_build_object('id', Topic.id, 'name', Topic.name) as topic,
        (
          SELECT array(SELECT
            jsonb_build_object('id', Test.id, 'input', Test.input, 'output', Test.output)
          FROM Test
          WHERE Test.task_id = T.id)
        ) as tests
      FROM Task T, TaskTopic Topic
      WHERE (T.topic_id = Topic.id)
      ORDER BY Topic.name
    `)

    return tasks
  }

  static async create(t: CreateTask): Promise<void> {
    const [task] = await db.query(
      `
        INSERT INTO Task as T (name, description, topic_id) VALUES (%L, %L, %L)
        RETURNING T.id
      `,
      t.name,
      t.description,
      t.topicId,
    )

    const tests = t.tests.map((test) => [task.id, test.input, test.output])
    await db.query(`INSERT INTO Test as T (task_id, input, output) VALUES %L`, tests)
  }

  static async update(t: UpdateTask): Promise<void> {
    await db.query(
      `
      UPDATE Task T
      SET
        name = %L,
        description = %L,
        topic_id = %L
      WHERE (T.id = %L)`,
      t.name,
      t.description,
      t.topicId,
      t.id,
    )

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
  }

  static async removeById(id: TaskId): Promise<void> {
    await db.query(`DELETE FROM Task as T WHERE (T.id = %L)`, id)
  }
}
