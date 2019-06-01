import React from 'react'
import './index.scss'

export interface TestProps {
  text: string
  num: number
}

const Test: React.FC<TestProps> = props => {
  return (
    <div className="button">
      <p>
        {props.text} + {props.num}
      </p>
    </div>
  )
}

export default Test
