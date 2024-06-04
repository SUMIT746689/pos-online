import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import Login from './routes/login.tsx'
// import { LoginRouteAction } from './routes/login.tsx'
import { isLoggedIn } from './lib/auth.ts'
// import Layout, { LayoutRouteAction } from './content/layout/Layout.tsx'
import Layout from './content/layout/Layout.tsx'
import Dashboard from './routes/dashboard.tsx'
import UserIndex from './routes/users/index.tsx'
// import { userList } from './repository/user.ts'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import ErrorBoundary from './components/ErrorBoundary.tsx'
import Suppliers from './routes/suppliers.tsx'
import Companies from './routes/companies.tsx'
import Vendors from './routes/vendors.tsx'
import Brands from './routes/brands.tsx'
import Categories from './routes/categories.tsx'
import Attributes from './routes/attributes.tsx'
import MeasurementUnits from './routes/measurement_units.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: async ({ request }) => {
      if (!await isLoggedIn()) return redirect('/login')
      if (new URL(request.url).pathname === "/") return redirect('/dashboard')
      return null
    },
    // action: LayoutRouteAction,
    errorElement:<ErrorBoundary />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          return null
        },
      },
      {
        path: "/users",
        element: <UserIndex />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
      {
        path: "/companies",
        element: <Companies />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
      {
        path: "/suppliers",
        element: <Suppliers />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
      {
        path: "/vendors",
        element: <Vendors />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
      {
        path: "/brands",
        element: <Brands />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
      {
        path: "/categories",
        element: <Categories />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
      {
        path: "/attributes",
        element: <Attributes />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
      {
        path: "/measurement_units",
        element: <MeasurementUnits />,
        loader: async () => {
          if (!await isLoggedIn()) {
            return redirect("/login")
          }
          // return await userList()
          return null
        },
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    // action: LoginRouteAction,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
