import { User } from "../https/user-interface"

export interface AuthUser {
  user: User | null
  token: string | null
}