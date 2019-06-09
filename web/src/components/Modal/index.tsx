import React, { forwardRef, useState, useImperativeHandle } from 'react'
import { Modal, Button } from 'semantic-ui-react'

export interface ModalProps {
  title: string
  description: string
  type: 'info' | 'confirm'
  onCancel?: () => any
  onConfirm?: () => any
  cancelText?: string
  confirmText?: string
}

const CustomModal: React.FC<ModalProps> = (props, ref) => {
  const { title, description, type } = props
  const cancelText = props.cancelText || 'Cancel'
  const confirmText = props.confirmText || 'Get It!'
  const onConfirm = props.onConfirm || (() => {})
  const onCancel = props.onCancel || (() => {})
  // states
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    trigger: () => {
      setOpen(true)
    },
  }))

  const handleCancelClick = () => {
    setOpen(false)
    onCancel()
  }

  const handleConfirmClick = () => {
    setOpen(false)
    onConfirm()
  }
  return (
    <Modal open={open} size="mini">
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{description}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {type === 'confirm' ? (
          <span>
            <Button primary onClick={handleConfirmClick}>
              {confirmText}
            </Button>
          </span>
        ) : (
          <span>
            <Button onClick={handleCancelClick}>{cancelText}</Button>
            <Button primary onClick={handleConfirmClick}>
              {confirmText}
            </Button>
          </span>
        )}
      </Modal.Actions>
    </Modal>
  )
}

export default forwardRef(CustomModal)
