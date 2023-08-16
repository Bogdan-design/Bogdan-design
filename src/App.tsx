import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout, LoginForm, SignUpForm, RecoverPassword } from './component'

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
        path: 'forgot',
        element: <RecoverPassword />,
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
