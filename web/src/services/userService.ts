import axios from 'axios'
import { Response, handleSuccess, handleError } from './respHelper'
import _ from 'lodash'

export interface UserRequest {
  name: string
  password: string
}

export interface TokenResponse {
  token: string
}

export interface UserResponse {
  id: number
  name: string
  userword: string
}
export function userLogin(req: UserRequest): Promise<Response<TokenResponse>> {
  return axios
    .post('/api/v1.0/users/login', req)
    .then(resp => {
      const respData = resp.data as TokenResponse
      storeToken(respData.token)
      return handleSuccess<TokenResponse>(resp)
    })
    .catch(err => handleError(err))
}

export function userRegister(req: UserRequest): Promise<Response<TokenResponse>> {
  return axios
    .post('/api/v1.0/users/register', req)
    .then(resp => {
      const respData = resp.data as TokenResponse
      storeToken(respData.token)
      return handleSuccess<TokenResponse>(resp)
    })
    .catch(err => handleError(err))
}

export function logout(): Promise<any> {
  return axios
    .get('/api/v1.0/users/logout', {
      headers: getAuthHeader(),
    })
    .then(resp => {
      removeToken()
      return handleSuccess(resp)
    })
    .catch(err => handleError(err))
}

export function getUser(): Promise<Response<UserResponse>> {
  return axios
    .get('/api/v1.0/users', {
      headers: getAuthHeader(),
    })
    .then(data => handleSuccess<UserResponse>(data))
    .catch(err => handleError(err))
}

export function validateUserword(userword: string): Promise<Response<UserResponse>> {
  return axios
    .get(`/api/v1.0/users/${userword}/validate`, {
      headers: getAuthHeader(),
    })
    .then(resp => ({
      isSuccess: true,
      data: resp.data,
    }))
}

// localstorage to store sessions
const SESSION_KEY = 'instapic_session_key'

function storeToken(token: string) {
  window.localStorage.setItem(SESSION_KEY, token)
}

export function removeToken() {
  window.localStorage.removeItem(SESSION_KEY)
}

export function getAuthHeader() {
  const token = window.localStorage.getItem(SESSION_KEY)
  return { Authorization: `Bearer ${token || ''}` }
}

export function hasToken() {
  return !_.isNil(window.localStorage.getItem(SESSION_KEY))
}
