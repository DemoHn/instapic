import React from 'react'

export interface TestProps {
  text: string
  num: number
}

const Test: React.FC<TestProps> = props => {
  return (
    <div className="Hey">
      <p>
        {props.text} + {props.num}
      </p>
    </div>
  )
}

export default Test
