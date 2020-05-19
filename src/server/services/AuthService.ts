import { AuthInfo, UserInfo, Credentials, UserId } from '@common/typings/auth'
import { StudentRepository } from '@repositories'
import { IHasher } from '@lib/Hasher'

export class AuthService {
  constructor(private hasher: IHasher) {}

  async login(credentials: Credentials): Promise<AuthInfo> {
    const isValid = await this.verifyCredentials(credentials)

    if (!isValid) {
      return { error: true, message: 'Неверные данные' }
    }

    const user = await StudentRepository.getUserInfoByLogin(credentials.login)
    return { user }
  }

  async verifyCredentials(fromUser: Credentials): Promise<boolean> {
    const fromDb = await StudentRepository.getPasswordByLogin(fromUser.login)
    const [oldHash, salt] = fromDb.split('.')

    const isValid = await this.hasher.verifyString(fromUser.password, oldHash, salt)
    return isValid
  }

  async getUserInfoById(id: UserId): Promise<UserInfo> {
    const user = await StudentRepository.getById(id)
    return user
  }
}
