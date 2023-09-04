export interface IUser {
  _id: string
  login: string
  email: string
  password: string
  salt: string
}

interface IError {
  message: string
  status?: number
  data?: object | null
}

export interface IUserState {
  user: IUser | null
  loading: boolean
  error: null | IError
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR = 'UPDATE_USER_ERROR',
}

interface IFetchUserAction {
  type: UserActionTypes.FETCH_USER
}
interface IFetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS
  payload: IUser
}
interface IFetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR
  payload: IError
}

interface IUserLogoutAction {
  type: UserActionTypes.LOGOUT_USER
}

interface IUserUpdateSuccess {
  type: UserActionTypes.UPDATE_USER_SUCCESS
  payload: IUser
}

interface IUserUpdateErorr {
  type: UserActionTypes.UPDATE_USER_ERROR
  payload: IError
}

export type TUserAction =
  | IFetchUserAction
  | IFetchUserSuccessAction
  | IFetchUserErrorAction
  | IUserLogoutAction
  | IUserUpdateErorr
  | IUserUpdateSuccess
