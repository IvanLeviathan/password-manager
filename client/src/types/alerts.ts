export interface IAlert {
  id?: string
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
  text: string
  status?: number
}

export interface IAlertsState {
  alerts: IAlert[]
}

export enum AlertsActionTypes {
  ADD_ALERT = 'ADD_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
}

interface IAddAlertAction {
  type: AlertsActionTypes.ADD_ALERT
  payload: IAlert
}

interface IRemoveAlertAction {
  type: AlertsActionTypes.REMOVE_ALERT
  payload: string
}

export type TAlertsAction = IAddAlertAction | IRemoveAlertAction
