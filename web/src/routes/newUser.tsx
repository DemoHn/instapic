import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

// layouts
import DesktopLayout from '../layouts/DesktopLayout'
import MobileLayout from '../layouts/MobileLayout'
// components
import MobileNavHeader from '../components/MobileNavHeader'
import DesktopHomeHeader from '../components/DesktopHomeHeader'
import RegisterForm from '../components/RegisterForm'
import ToastMessage from '../components/ToastMessage'

// toast
import {
  ToastProvider,
  withToastManager,
  ToastManagerProps,
} from 'react-toast-notifications'
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
// submit handlers
const useUserActions = (toastManager: any) => {
  const [handled, setHandled] = useState(false)

  const onLoginSubmit = useCallback(
    async (name: string, password: string) => {
      if (!handled) {
        const { isSuccess } = await userLogin({ name, password })
        setHandled(true)
        if (isSuccess) {
          toastManager.add(
            {
              title: 'Login Succeeded!',
              subTitle: 'This page will be redirected quickly',
            },
            {
              appearance: 'info',
              autoDismiss: true,
            },
            () => {
              setHandled(false)
            }
          )
        }
      }
    },
    [handled, toastManager]
  )

  const onRegisterSubmit = useCallback(
    async (name: string, password: string) => {
      // ensure not duplicate submit
      if (!handled) {
        const { isSuccess } = await userRegister({ name, password })
        if (isSuccess) {
          toastManager.add(
            {
              title: 'Register Succeeded!',
              subTitle: 'This page will be redirected quickly',
            },
            {
              appearance: 'info',
              autoDismiss: true,
            },
            () => {
              // callback
              setHandled(false)
            }
          )
        }
        setHandled(true)
      }
    },
    [handled, toastManager]
  )

  return [onLoginSubmit, onRegisterSubmit]
}

const renderMobileUserPage = withToastManager((props: ToastManagerProps) => {
  const [onLoginSubmit, onRegisterSubmit] = useUserActions(props.toastManager)
  return (
    <MobileLayout
      header={<MobileNavHeader leftLink="/" />}
      footer={null}
      showFooter={false}
    >
      <MobileContainerFrame>
        <RegisterForm onLoginSubmit={onLoginSubmit} onRegisterSubmit={onRegisterSubmit} />
      </MobileContainerFrame>
    </MobileLayout>
  )
})

const renderDesktopUserPage = withToastManager((props: ToastManagerProps) => {
  const [onLoginSubmit, onRegisterSubmit] = useUserActions(props.toastManager)
  return (
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
  )
})

const ToastMessageWrapper: React.FC = (props: any) => {
  return (
    <ToastMessage
      isSuccess={props.appearance === 'info'}
      title={props.children.title}
      subTitle={props.children.subTitle}
    />
  )
}
const NewUser: React.FC = () => {
  return (
    <ToastProvider
      placement="bottom-center"
      components={{ Toast: ToastMessageWrapper }}
      autoDismissTimeout={2000}
    >
      {isMobile ? renderMobileUserPage() : renderDesktopUserPage()}
    </ToastProvider>
  )
}

export default NewUser
