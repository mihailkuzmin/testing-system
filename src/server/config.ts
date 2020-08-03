import dotenv from 'dotenv'
import qs from 'qs'
import { PoolConfig } from 'pg'

dotenv.config()

export const dbConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
}

export const appConfig = {
  port: Number(process.env.NODE_PORT),
  restartTime: Number(process.env.NODE_RESTART_TIME),
  fastifyConfig: {
    logger: {
      prettyPrint: true,
    },
    querystringParser: (str: any) => qs.parse(str) as any,
  },
  sessionConfig: {
    secret: process.env.NODE_SESSION_SECRET as string,
    cookie: {
      maxAge: Number(process.env.NODE_SESSION_COOKIE_MAX_AGE),
      secure: Boolean(Number(process.env.NODE_SESSION_COOKIE_SECURE)),
    },
  },
}
