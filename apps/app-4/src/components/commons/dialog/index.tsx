import type { ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { useDialog } from './use-dialog'

type DialogProps = {
  title: string
  children: (closeDialog: VoidFunction) => ReactNode
  trigger: ReactNode
  isLarge?: boolean
}

export const Dialog = ({ children, title, trigger, isLarge }: DialogProps) => {
  const { isOpen, close, handleTriggerClick } = useDialog()

  return (
    <>
      <Slot onClick={() => handleTriggerClick()}>{trigger}</Slot>
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
