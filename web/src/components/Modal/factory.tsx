import Modal, { ModalProps } from './index'
import React, { useState, useRef } from 'react'

export const ModalFactory = {
  useModal(): [(props: ModalProps) => any, () => any] {
    const modalRef = useRef(null)

    const [props, setProps] = useState<ModalProps>({
      type: 'confirm',
      title: '',
      description: '',
    })

    const renderModal = () => {
      return <Modal {...props} ref={modalRef} />
    }

    const trigger = (props: ModalProps) => {
      setProps(props)
      setTimeout(() => {
        if (modalRef.current) {
          // @ts-ignore
          modalRef.current.trigger()
        }
      }, 200)
    }

    return [trigger, renderModal]
  },
}
