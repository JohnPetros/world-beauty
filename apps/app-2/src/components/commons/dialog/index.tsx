import { Input, Modal, ModalContent, ModalHeader } from '@nextui-org/react'
import { Slot } from '@radix-ui/react-slot'
import { Component, type ReactNode } from 'react'

type DialogProps = {
  title: string
  children: ReactNode
  trigger: ReactNode
}

type DialogState = {
  isOpen: boolean
  title: string
}

export class Dialog extends Component<DialogProps, DialogState> {

  async getBrothers() {
    
  }

  render() {
    return (
      <>
        <Slot>{this.props.trigger}</Slot>
        <Modal isOpen={this.state.isOpen}>
          <ModalContent>
            <>
              <ModalHeader className='flex flex-col gap-1'>{this.state.title}</ModalHeader>
              <Input autoFocus label='Nome' placeholder='Rodrigo Faro' variant='bordered' />
              <Input
                autoFocus
                label='E-mail'
                placeholder='nome@provedor.com'
                variant='bordered'
              />
              {this.props.children}
            </>
          </ModalContent>
        </Modal>
      </>
    )
  }
}
