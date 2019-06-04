import React from 'react'
import styled from 'styled-components'

export interface TipProps {
  current: number
  total: number
}

const TipFrame = styled.span`
  display: inline-block;
  background-color: rgba(10, 10, 10, 0.6);
  height: 20px;
  color: rgb(240, 240, 240);
  border-radius: 10px;
  font-size: 11px;
  min-width: 40px;
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
  line-height: 20px;
`

const Tip: React.FC<TipProps> = props => {
  const { current, total } = props
  return (
    <TipFrame>
      {current} / {total}
    </TipFrame>
  )
}

export default Tip
