import React from 'react'
import styled from 'styled-components'
const loading = require('../../assets/loading.svg')

const Wrapper = styled.div`
  justify-content: center;
  display: flex;
  height: 60px;
  align-items: center;
`
const DefaultRefresh: React.FC = () => {
  return (
    <Wrapper>
      <img src={loading} alt="" height={30} />
    </Wrapper>
  )
}
export default DefaultRefresh
