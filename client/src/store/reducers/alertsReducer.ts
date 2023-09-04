import {
  AlertsActionTypes,
  IAlertsState,
  TAlertsAction,
} from '../../types/alerts'

const initialState: IAlertsState = {
  alerts: [],
}

export const alertsReducer = (
  state = initialState,
  action: TAlertsAction,
): IAlertsState => {
  switch (action.type) {
    case AlertsActionTypes.ADD_ALERT:
      return { alerts: [...state.alerts, action.payload] }
    case AlertsActionTypes.REMOVE_ALERT:
      return {
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      }
    default:
      return state
  }
}
