import { Component, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

type DialogProps = {
  title: string
  children: (closeDialog: VoidFunction) => ReactNode
  trigger: ReactNode
  isLarge?: boolean
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

  close() {
    this.setState({
      isOpen: false,
    })
  }

  open() {
    this.setState({
      isOpen: true,
    })
  }

  handleTriggerClick() {
    this.open()
  }

  render() {
    return (
      <>
        <Slot onClick={() => this.handleTriggerClick()}>{this.props.trigger}</Slot>
        <Modal
          isOpen={this.state.isOpen}
          onClose={() => this.close()}
          onOpenChange={() => this.close()}
          size={this.props.isLarge ? '5xl' : 'lg'}
        >
          <ModalContent className='p-6'>
            <>
              <ModalHeader className='p-0'>{this.props.title}</ModalHeader>
              <ModalBody className='max-h-[36rem] overflow-y-auto overflow-x-hidden'>
                {this.props.children(() => this.close())}
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      </>
    )
  }
}
