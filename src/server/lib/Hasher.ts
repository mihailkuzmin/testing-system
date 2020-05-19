import crypto from 'crypto'
import { promisify } from 'util'

const getRandomBytes = promisify(crypto.randomBytes)
const getHash = promisify(crypto.pbkdf2)

export interface IHasher {
  generateSalt(): Promise<string>
  generateHash(str: string): Promise<string>
  verifyString(str: string, oldHash: string, salt: string): Promise<boolean>
}

export class Hasher implements IHasher {
  constructor(
    private keyLength: number = 16,
    private iterations: number = 10,
    private saltLength = 16,
  ) {}

  async generateSalt(): Promise<string> {
    const buffer = await getRandomBytes(this.saltLength)
    const salt = buffer.toString('hex')

    return salt
  }

  async generateHash(str: string): Promise<string> {
    const salt = await this.generateSalt()

    const buffer = await getHash(str, salt, this.iterations, this.keyLength, 'sha512')
    const hash = buffer.toString('hex')

    return hash.concat('.', salt)
  }

  async verifyString(str: string, oldHash: string, salt: string): Promise<boolean> {
    const buffer = await getHash(str, salt, this.iterations, this.keyLength, 'sha512')
    const newHash = buffer.toString('hex')

    return newHash === oldHash
  }
}
