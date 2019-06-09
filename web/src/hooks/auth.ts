import { useState, useEffect } from 'react'
import { getUser, hasToken, UserResponse } from '../services/userService'

export interface AuthResult {
  hasResult: boolean
  isLogin: boolean
  userName: string
}

export interface AuthError {
  code?: number
  title: string
  description: string
}

export default function useAuth(errorCallback?: (err: AuthError) => any) {
  const [authResult, setAuthResult] = useState<AuthResult>({
    hasResult: false,
    isLogin: false,
    userName: '',
  })

  const authErrorCallback = errorCallback || (err => {})
  useEffect(() => {
    const fetchUserData = async () => {
      const { isSuccess, data, error } = await getUser()
      if (isSuccess) {
        const respData = data as UserResponse
        const authResult = {
          hasResult: true,
          isLogin: true,
          userName: respData.name,
        }
        setAuthResult(authResult)
      } else {
        setAuthResult({
          hasResult: true,
          isLogin: false,
          userName: '',
        })
        authErrorCallback(error as AuthError)
      }
    }

    if (hasToken()) {
      fetchUserData()
    } else {
      setAuthResult({
        hasResult: true,
        isLogin: false,
        userName: '',
      })
      authErrorCallback({
        title: 'Auth Error',
        description: 'no token exists!',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return authResult
}
