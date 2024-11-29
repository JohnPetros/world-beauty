import type { ReactNode } from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { useDialog } from './use-dialog'

type DialogProps = {
  title: string
  children: (closeDialog: VoidFunction) => ReactNode
  trigger: (openDialog: VoidFunction) => ReactNode
  isLarge?: boolean
}

export const Dialog = ({ children, trigger, title, isLarge }: DialogProps) => {
  const { isOpen, close, handleTriggerClick } = useDialog()

  return (
    <>
      {trigger(() => handleTriggerClick())}
      <Modal
        isOpen={isOpen}
        onClose={() => close()}
        onOpenChange={() => close()}
        classNames={{ header: 'ml-6' }}
        size={isLarge ? '5xl' : 'lg'}
      >
        <ModalContent className='p-1 py-4'>
          <>
            <ModalHeader className='p-0'>{title}</ModalHeader>
            <ModalBody className='max-h-[36rem] overflow-y-auto overflow-x-hidden'>
              {children(() => close())}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
