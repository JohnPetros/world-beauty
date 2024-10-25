import { useState } from 'react'

export function useAppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  function closeDrawer() {
    setIsDrawerOpen(false)
  }

  function openDrawer() {
    setIsDrawerOpen(true)
  }

  function handleMenuClick() {
    openDrawer()
  }

  return {
    isDrawerOpen,
    closeDrawer,
    openDrawer,
    handleMenuClick,
  }
}
