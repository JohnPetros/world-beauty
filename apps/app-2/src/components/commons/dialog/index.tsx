import { Component, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'

type DialogProps = {
  title: string
  children: (closeDialog: VoidFunction) => ReactNode
  trigger: ReactNode
}

type DialogState = {
  isOpen: boolean
}

export class Dialog extends Component<DialogProps, DialogState> {
  constructor(props: DialogProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handleTriggerClick() {
    this.setState({
      isOpen: true,
    })
  }

  render() {
    return (
      <>
        <Slot onClick={() => this.handleTriggerClick()}>{this.props.trigger}</Slot>
        <Modal isOpen={this.state.isOpen} size='lg'>
          <ModalContent className='p-6'>
            {(onClose: VoidFunction) => (
              <>
                <ModalHeader className='p-0'>{this.props.title}</ModalHeader>
                <div className='mt-6'>{this.props.children(onClose)}</div>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
  }
}
