import { Pool, QueryResult, PoolConfig } from 'pg'

class DB {
  private pool!: Pool

  public async connect(config: PoolConfig): Promise<void> {
    try {
      // @ts-ignore
      this.pool = new Pool(config)
      await this.pool.query('SELECT NOW()')
    } catch (e) {
      throw e
    }
  }

  public async query(text: string, values?: any[]): Promise<QueryResult<any>> {
    return this.pool.query(text, values)
  }
}

export const db: DB = new DB()
