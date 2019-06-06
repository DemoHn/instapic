import React, { useState } from 'react'
import { Message } from 'semantic-ui-react'

export interface ToastMessageProps {
  isSuccess: boolean
  title: string
  subTitle: string
}

const SuccessMessage = (props: ToastMessageProps) => {
  const { title, subTitle } = props
  return (
    <Message info size="small">
      <Message.Header>{title}</Message.Header>
      <p>{subTitle}</p>
    </Message>
  )
}

const ErrorMessage = (props: ToastMessageProps) => {
  const { title, subTitle } = props
  return (
    <Message negative size="small">
      <Message.Header>{title}</Message.Header>
      <p>{subTitle}</p>
    </Message>
  )
}

const ToastMessage: React.FC<ToastMessageProps> = props => {
  const { isSuccess } = props

  return isSuccess ? <SuccessMessage {...props} /> : <ErrorMessage {...props} />
}

export default ToastMessage
