import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { CustomersPage } from './components/pages/customers'
import { ServicesPage } from './components/pages/services'
import { ProductsPage } from './components/pages/products'
import { ReportsPage } from './components/pages/reports'
import { AppLayout } from './components/layouts/app'
import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <CustomersPage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/services',
        element: <ServicesPage />,
      },
      {
        path: '/reports',
        element: <ReportsPage />,
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
