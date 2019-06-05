import React from 'react'
import styled from 'styled-components'
import { Input, Button } from 'semantic-ui-react'

const Banner = styled.h2`
  line-height: 0.95em;
  text-align: center;
`
const SubHeader = styled.div`
  font-size: 13px;
  color: #666;
`

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
`

const InputWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
`

const ButtonColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-right: auto !important;
  margin-top: 15px;
`
export interface RegisterFormProps {
  onLoginSubmit: Function
  onRegisterSubmit: Function
}
const RegisterForm: React.FC<RegisterFormProps> = props => {
  const { onLoginSubmit, onRegisterSubmit } = props
  return (
    <FormWrapper>
      <Banner>Welcome to InstaPic!</Banner>
      <SubHeader>InstaPic is a place to create / share / enjoy.</SubHeader>
      <InputWrapper>
        <Input icon="user" iconPosition="left" placeholder="username" fluid />
      </InputWrapper>
      <InputWrapper>
        <Input
          icon="lock"
          iconPosition="left"
          placeholder="password"
          type="password"
          fluid
        />
      </InputWrapper>

      <ButtonColumnWrapper>
        <Button.Group>
          <Button
            onClick={() => {
              onRegisterSubmit()
            }}
          >
            Sign Up
          </Button>
          <Button.Or />
          <Button
            positive
            onClick={() => {
              onLoginSubmit()
            }}
          >
            Sign In
          </Button>
        </Button.Group>
      </ButtonColumnWrapper>
    </FormWrapper>
  )
}

export default RegisterForm
