import { AuthInfo, UserInfo, Credentials, UserId } from '@common/typings/auth'
import { Role } from '@common/typings/user'
import { UserRepository } from '@repositories'

export class AuthService {
  static async login(credentials: Credentials): Promise<AuthInfo> {
    const isValid = await UserRepository.verifyCredentials(credentials)
    if (!isValid) {
      return { error: true, message: 'Неверные данные' }
    }

    const user = await UserRepository.getUserInfoByLogin(credentials.login)

    return { user }
  }

  static async getUserInfoById(id: UserId): Promise<UserInfo> {
    return UserRepository.getUserInfoById(id)
  }

  static async getRoles(): Promise<Role[]> {
    return UserRepository.getRoles()
  }
}
