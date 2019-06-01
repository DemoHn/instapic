import React from 'react'
import { Button } from 'semantic-ui-react'

export interface ButtonProps {
  text: string
}

const CtrlButton: React.FC = props => {
  return <Button>{props.children}</Button>
}
export default CtrlButton
