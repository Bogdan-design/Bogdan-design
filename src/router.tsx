import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout, LoginForm } from './component'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Layout />,
    children: [
      {
        element: <LoginForm />,
      },
    ],
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>hello</div>,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
