export type LoginArg = {
  email: string
  password: string
  rememberMe?: boolean
}

export type SignUpResponseType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type User = {
  email: string
  name: string
  id: string
  isEmailVerified: boolean
  avatar?: string | null
  created: string
  updated: string
}
