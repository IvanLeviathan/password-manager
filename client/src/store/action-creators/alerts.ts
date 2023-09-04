import { Dispatch } from '@reduxjs/toolkit'
import { AlertsActionTypes, IAlert, TAlertsAction } from '../../types/alerts'

export const addAlert = (alert: IAlert) => {
  return async (dispatch: Dispatch<TAlertsAction>) => {
    alert.id = new Date().getTime().toString()
    if (alert.status)
      alert.type =
        alert.status >= 200 && alert.status <= 299 ? 'success' : 'danger'

    dispatch({ type: AlertsActionTypes.ADD_ALERT, payload: alert })
    if (alert.id)
      setTimeout(() => {
        dispatch({
          type: AlertsActionTypes.REMOVE_ALERT,
          payload: alert.id || '',
        })
      }, 10 * 1000)
  }
}

export const removeAlert = (id: string) => {
  return async (dispatch: Dispatch<TAlertsAction>) => {
    dispatch({ type: AlertsActionTypes.REMOVE_ALERT, payload: id })
  }
}
