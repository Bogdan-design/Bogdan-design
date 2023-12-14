import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/component'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArg } from '@/services/auth/auth.types'

export const Login = () => {
  const [logIn] = useLoginMutation()
  const navigate = useNavigate()

  const handleLogin = async (args: LoginArg) => {
    try {
      await logIn(args)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return <LoginForm onSubmit={handleLogin} />
}
