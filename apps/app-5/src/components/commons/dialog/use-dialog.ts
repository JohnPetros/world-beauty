import { useState } from 'react'

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false)

  function close() {
    setIsOpen(false)
  }

  function open() {
    setIsOpen(true)
  }

  function handleTriggerClick() {
    open()
  }

  return {
    isOpen,
    handleTriggerClick,
    close,
    open,
  }
}
