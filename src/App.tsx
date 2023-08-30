import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  Layout,
  LoginForm,
  SignUpForm,
  RecoverPassword,
  NewPassword,
  PersonalInformation,
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

export function App() {
  return (
    <div>
      <RouterProvider router={router} fallbackElement={'Loading...'} />
    </div>
  )
}
