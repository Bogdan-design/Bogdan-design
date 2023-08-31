import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import { App } from './App'
import {
  Layout,
  LoginForm,
  NewPassword,
  PersonalInformation,
  RecoverPassword,
  SignUpForm,
} from './component'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'registration',
        element: <SignUpForm />,
      },
      {
        path: 'recover',
        element: <RecoverPassword />,
      },
      {
        path: 'new',
        element: <NewPassword />,
      },
      {
        path: 'profile',
        element: <PersonalInformation />,
      },
    ],
  },
])

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Layout />,
    children: [],
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'profile',
        element: <PersonalInformation />,
      },
    ],
  },
]

const router = createBrowserRouter([...privateRoutes, ...publicRoutes])

export const Router = () => {
  return <RouterProvider router={router} />
}
