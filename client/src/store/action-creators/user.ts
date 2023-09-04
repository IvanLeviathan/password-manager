import { TUserAction, UserActionTypes } from '../../types/user'
import { Dispatch } from '@reduxjs/toolkit'
import apiRequest from '../../utils/apiRequest'

export const fetchUser = () => {
  return async (dispatch: Dispatch<TUserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER })
      const response = await apiRequest(
        '/users/',
        'GET',
        {},
        { 'x-auth-token': localStorage.getItem('jwt') },
      )
      if (response?.status === 200)
        dispatch({
          type: UserActionTypes.FETCH_USER_SUCCESS,
          payload: response.data.data,
        })
      else {
        if (response.data?.message) {
          return dispatch({
            type: UserActionTypes.FETCH_USER_ERROR,
            payload: {
              status: response.data.status,
              message: response.data.message,
              data: response.data,
            },
          })
        }
        dispatch({
          type: UserActionTypes.FETCH_USER_ERROR,
          payload: {
            status: response.status || 500,
            message: response.statusText || 'unknownError',
            data: response,
          },
        })
      }
    } catch (e) {
      console.log(e)
      if (typeof e === 'object')
        dispatch({
          type: UserActionTypes.FETCH_USER_ERROR,
          payload: { status: 500, message: 'unknownError', data: e },
        })
    }
  }
}

export const refetchUser = () => {
  return async (dispatch: Dispatch<TUserAction>) => {
    try {
      const response = await apiRequest(
        '/users/',
        'GET',
        {},
        { 'x-auth-token': localStorage.getItem('jwt') },
      )
      if (response?.status === 200) {
        dispatch({
          type: UserActionTypes.FETCH_USER_SUCCESS,
          payload: response.data.data,
        })
      } else {
        dispatch({
          type: UserActionTypes.LOGOUT_USER,
        })
        localStorage.removeItem('jwt')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch: Dispatch<TUserAction>) => {
    dispatch({
      type: UserActionTypes.LOGOUT_USER,
    })
    localStorage.removeItem('jwt')
  }
}

export const updateUser = (login: string, email: string, password?: string) => {
  return async (dispatch: Dispatch<TUserAction>) => {
    const response = await apiRequest(
      '/users/',
      'PUT',
      { login, email, password },
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (response?.status === 200) {
      dispatch({
        type: UserActionTypes.UPDATE_USER_SUCCESS,
        payload: response.data.data,
      })
      return response
    } else {
      if (response.data?.message) {
        return dispatch({
          type: UserActionTypes.UPDATE_USER_ERROR,
          payload: {
            status: response.data.status,
            message: response.data.message,
            data: response.data,
          },
        })
      }
      dispatch({
        type: UserActionTypes.UPDATE_USER_ERROR,
        payload: {
          status: response.status || 500,
          message: response.statusText || 'unknownError',
          data: response,
        },
      })
    }
  }
}
