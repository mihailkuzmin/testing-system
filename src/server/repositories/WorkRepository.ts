import { db } from '@db'
import { Work, CreateWork, WorkId, UpdateWork } from '@common/typings/work'
import { Task, TaskId } from '@common/typings/task'
import { Group } from '@common/typings/group'

export class WorkRepository {
  static async create(w: CreateWork): Promise<void> {
    const [work] = await db.query(
      `
        INSERT INTO Work as W (name, open_at, close_at) VALUES (%L, %L, %L)
        RETURNING W.id
      `,
      w.name,
      w.openAt,
      w.closeAt,
    )

    const tasks = w.tasks.map((taskId) => [work.id, taskId])
    const groups = w.groups.map((groupId) => [work.id, groupId])
    await Promise.all([
      db.query(`INSERT INTO Work_Task as WT (work_id, task_id) VALUES %L`, tasks),
      db.query(`INSERT INTO StudentGroup_Work as WG (work_id, group_id) VALUES %L`, groups),
    ])
  }

  static async getById(id: WorkId): Promise<Work> {
    const [work] = await db.query(
      `
        SELECT
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
        FROM Work W
        WHERE
          (W.id = %L)
      `,
      id,
    )
    return work
  }

  static async update(work: UpdateWork): Promise<void> {
    await db.query(
      `
        UPDATE Work W
        SET
          name = %L,
          open_at = %L,
          close_at = %L
        WHERE (W.id = %L)
      `,
      work.name,
      work.openAt,
      work.closeAt,
      work.id,
    )

    const tasks = work.tasks.map((taskId) => [work.id, taskId])
    const groups = work.groups.map((groupId) => [work.id, groupId])
    await Promise.all([
      db.query(
        `
      DELETE FROM Work_Task as WT WHERE (WT.work_id = %L);
      INSERT INTO Work_Task (work_id, task_id) VALUES %L;
    `,
        work.id,
        tasks,
      ),
      db.query(
        `
      DELETE FROM StudentGroup_Work as WG WHERE (WG.work_id = %L);
      INSERT INTO StudentGroup_Work as WG (work_id, group_id) VALUES %L;
      `,
        work.id,
        groups,
      ),
    ])
  }

  static async getTasksOfWork(id: WorkId): Promise<Task[]> {
    const tasks = await db.query(
      `
        SELECT
          T.id, T.name, T.description, jsonb_build_object('id', Topic.id, 'name', Topic.name) as topic,
          (
            SELECT array(SELECT jsonb_build_object('id', Test.id, 'input', Test.input, 'output', Test.output)
            FROM Test
            WHERE Test.task_id = T.id
            ORDER BY id)
          ) as tests
        FROM Work_Task WT, Task T, TaskTopic Topic
        WHERE
          (WT.work_id = %L and T.id = WT.task_id and Topic.id = T.topic_id);
      `,
      id,
    )

    return tasks
  }

  static async getGroupsOfWork(id: WorkId): Promise<Group[]> {
    const groups = await db.query(
      `
      SELECT
        G.id, G.name
      FROM StudentGroup G, StudentGroup_Work WG
      WHERE (WG.work_id = %L and WG.group_id = G.id)
    `,
      id,
    )

    return groups
  }

  static async getWorksWithTask(id: TaskId): Promise<Work[]> {
    const works = await db.query(
      `
        SELECT
          W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt"
        FROM Work W, Work_Task WT
        WHERE
          (W.id = WT.work_id and WT.task_id = %L)
    `,
      id,
    )

    return works
  }

  static async getAll(): Promise<Work[]> {
    const works = await db.query(
      `SELECT W.id, W.name, W.open_at as "openAt", W.close_at as "closeAt" FROM Work W`,
    )
    return works
  }

  static async removeById(id: WorkId): Promise<void> {
    await db.query(`DELETE FROM Work as W WHERE (W.id = %L)`, id)
  }
}
