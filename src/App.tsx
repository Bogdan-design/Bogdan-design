import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout, LoginForm, SignUpForm, RecoverPassword, NewPassword } from './component'

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
