import { Pool, PoolConfig } from 'pg'
import format from 'pg-format'

class DB {
  private pool!: Pool

  public async connect(config: PoolConfig): Promise<void> {
    this.pool = new Pool(config)
    await this.pool.query('SELECT NOW()')
  }

  public async query(text: string, ...values: any[]): Promise<any[]> {
    const query = format(text, ...values)
    const { rows } = await this.pool.query(query)
    return rows
  }

  public createQueryString(text: string, ...values: any[]): string {
    return format(text, ...values)
  }
}

export const db = new DB()
