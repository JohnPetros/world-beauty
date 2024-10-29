import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'

import './styles/global.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CustomersPage } from './components/pages/customers'
import { AppLayout } from './components/layouts/app'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <CustomersPage />,
      },
    ],
  },
])

const rootElement = document.getElementById('root')

if (rootElement)
  createRoot(rootElement).render(
    <StrictMode>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </StrictMode>,
  )
