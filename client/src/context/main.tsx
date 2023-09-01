import { createContext } from 'react'

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
export interface IUser {
  _id: string
  login: string
  email: string
  password: string
  salt: string
}

interface IContext {
  alerts: IAlert[] | []
  addAlert: (alert: IAlert) => void
  removeAlert: (alertId: string) => void
  getUser: () => void
  user: IUser | null
}

const MainContext = createContext<IContext | null>(null)
export default MainContext
