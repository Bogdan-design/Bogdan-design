import { Navigate } from 'react-router-dom'

import { LoginForm } from '../component'
import { useLoginMutation, useMeQuery } from '../services/auth/auth.service.ts'

export const Login = () => {
  const [logIn] = useLoginMutation()
  const { isError, isLoading } = useMeQuery()

  const isAuthenticated = !isError

  if (isLoading) return <div>Loading...</div>

  if (isAuthenticated) return <Navigate to={'/'} replace={true} />

  return <LoginForm onSubmit={logIn} />
}
