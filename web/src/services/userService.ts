import axios from 'axios'
import { Response } from './types'

export interface UserRequest {
  name: string
  password: string
}

export interface TokenResponse {
  token: string
}

export function userLogin(req: UserRequest): Promise<Response<TokenResponse>> {
  return axios.post('/api/v1.0/users/login', req).then(resp => {
    const respData = resp.data as TokenResponse
    storeToken(respData.token)
    return { isSuccess: true, data: respData }
  })
}

export function userRegister(req: UserRequest): Promise<Response<TokenResponse>> {
  return axios.post('/api/v1.0/users/register', req).then(resp => {
    const respData = resp.data as TokenResponse
    storeToken(respData.token)
    return { isSuccess: true, data: respData }
  })
}

export function logout(): Promise<any> {
  return axios
    .get('/api/v1.0/user/logout', {
      headers: getAuthHeader(),
    })
    .then(resp => {
      removeToken()
      return resp.data
    })
}

// localstorage to store sessions
const SESSION_KEY = 'instapic_session_key'

function storeToken(token: string) {
  window.localStorage.setItem(SESSION_KEY, token)
}

function removeToken() {
  window.localStorage.removeItem(SESSION_KEY)
}

export function getAuthHeader() {
  const token = window.localStorage.getItem(SESSION_KEY)
  return { Authorization: `Bearer ${token || ''}` }
}
