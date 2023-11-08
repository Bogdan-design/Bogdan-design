import { Navigate, useNavigate } from 'react-router-dom'

import { LoginForm } from '../component'
import { useLoginMutation, useMeQuery } from '../services/auth/auth.service'

import { LoginArg } from 'services/auth/auth.types'

export const Login = () => {
  const [logIn] = useLoginMutation()
  const { isError, isLoading } = useMeQuery()
  const navigate = useNavigate()

  const handleLogin = async (args: LoginArg) => {
    try {
      await logIn(args)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  // const isAuthenticated = !isError
  //
  // if (isLoading) return <div>Loading...</div>
  //
  // if (isAuthenticated) return <Navigate to={'/'} replace={true} />

  return <LoginForm onSubmit={handleLogin} />
}
