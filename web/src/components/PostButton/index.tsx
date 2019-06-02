import React from 'react'
import { Button } from 'semantic-ui-react'

export interface ButtonProps {
  text?: string
}

const PostButton: React.FC<ButtonProps> = props => {
  const { text } = props

  return (
    <Button color="red" size="tiny" positive compact>
      {text || props.children}
    </Button>
  )
}
export default PostButton
