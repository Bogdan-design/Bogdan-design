import { useState } from 'react'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Button, Layout, SignUpForm } from './component'
import { Decks } from './pages/decks/decks.tsx'
import { Login } from './pages/login.tsx'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
} from './services/auth/auth.service.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <SignUpForm />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
    ],
  },
  ...publicRoutes,
  {
    path: '*',
    element: <h1>404</h1>,
  },
])

export const Router = () => {
  const [logout] = useLogoutMutation()
  const [value, setValue] = useState<any>('')
  const [updateProfile] = useUpdateProfileMutation()

  return (
    <div>
      <input type={'file'} onChange={e => setValue(e.currentTarget.files?.[0])} />
      <Button
        onClick={() => {
          const formData = new FormData()

          if (value) formData.append('avatar', value)

          updateProfile(formData)
        }}
      >
        Update avatar
      </Button>
      <Button onClick={() => logout}>Log out</Button>
      <RouterProvider router={router} />
    </div>
  )
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()

  const isAuthenticated = !isError

  if (isLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
