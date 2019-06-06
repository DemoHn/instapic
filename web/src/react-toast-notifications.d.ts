declare module 'react-toast-notifications' {
  import React from 'react'
  export interface ToastManagerProps {
    toastManager: any
  }
  export interface ToastProviderProps {
    placement: string
    components: {
      Toast: React.ReactNode
    }
    autoDismissTimeout: number
  }
  export function withToastManager(component: React.ReactNode)
  export class ToastProvider extends React.Component<ToastProviderProps> {}
}
