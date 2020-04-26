import { Pool, PoolConfig } from 'pg'
import format from 'pg-format'

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

  public async query(text: string, ...values: any[]): Promise<any> {
    const query = format(text, ...values)
    const { rows } = await this.pool.query(query)
    return rows
  }
}

export const db = new DB()
