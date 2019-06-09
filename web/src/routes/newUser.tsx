import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Redirect } from 'react-router-dom'
// layouts
import DesktopLayout from '../layouts/DesktopLayout'
import MobileLayout from '../layouts/MobileLayout'
// components
import MobileNavHeader from '../components/MobileNavHeader'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
import RegisterForm from '../components/RegisterForm'
import { ModalFactory } from '../components/Modal'

// service
import { userLogin, userRegister } from '../services/userService'

const ContainerFrame = styled.div`
  display: flex;
  margin-top: 160px;
  align-items: center;
  justify-content: center;
`

const FormWrapper = styled.div`
  width: 500px;
  padding: 60px 40px;
  -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
`

const MobileContainerFrame = styled.div`
  margin-top: 90px;
`

function parseQuery(queryString: string) {
  var query: Record<string, any> = {}
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}

// submit handlers
const useUserActions = (triggerModal: any, setConfirmRedirect: any) => {
  const onLoginSubmit = useCallback(
    async (name: string, password: string) => {
      const { isSuccess, error } = await userLogin({ name, password })
      if (isSuccess) {
        triggerModal({
          type: 'confirm',
          title: 'Login Succeeded!',
          description: 'click `Get it` to continue',
          onConfirm: () => {
            setConfirmRedirect(true)
          },
        })
      } else {
        const err = error as any
        triggerModal({
          type: 'confirm',
          title: err.title,
          description: err.description,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setConfirmRedirect]
  )

  const onRegisterSubmit = useCallback(
    async (name: string, password: string) => {
      // ensure not duplicate submit
      const { isSuccess, error } = await userRegister({ name, password })
      if (isSuccess) {
        triggerModal({
          type: 'confirm',
          title: 'Register Succeeded!',
          escription: 'click `Get it` to continue',
          onConfirm: () => {
            setConfirmRedirect(true)
          },
        })
      } else {
        const err = error as any
        triggerModal({
          type: 'confirm',
          title: err.title,
          description: err.description,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setConfirmRedirect]
  )

  return [onLoginSubmit, onRegisterSubmit]
}

const NewUser: React.FC = (props: any) => {
  const [triggerModal, createModal] = ModalFactory.useModal()
  // states
  const [confirmRedirect, setConfirmRedirect] = useState(false)
  const [onLoginSubmit, onRegisterSubmit] = useUserActions(
    triggerModal,
    setConfirmRedirect
  )

  const qs = parseQuery(props.location.search)
  const refURL = qs['ref'] || '/'
  return (
    <div>
      {confirmRedirect ? <Redirect to={refURL} /> : null}
      {isMobile ? (
        <MobileLayout
          header={<MobileNavHeader leftLink="/" />}
          footer={null}
          showFooter={false}
        >
          <MobileContainerFrame>
            <RegisterForm
              onLoginSubmit={onLoginSubmit}
              onRegisterSubmit={onRegisterSubmit}
            />
          </MobileContainerFrame>
        </MobileLayout>
      ) : (
        <DesktopLayout
          header={<DesktopHomeHeader hideUserBar={true} user={{ isLogin: false }} />}
        >
          <ContainerFrame>
            <FormWrapper>
              <RegisterForm
                onLoginSubmit={onLoginSubmit}
                onRegisterSubmit={onRegisterSubmit}
              />
            </FormWrapper>
          </ContainerFrame>
        </DesktopLayout>
      )}
      {createModal()}
    </div>
  )
}

export default NewUser
