import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './userReducer'
import { alertsReducer } from './alertsReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  alerts: alertsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
