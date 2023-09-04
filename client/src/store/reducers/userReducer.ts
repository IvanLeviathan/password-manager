import { IUserState, TUserAction, UserActionTypes } from '../../types/user'

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
}

export const userReducer = (
  state = initialState,
  action: TUserAction,
): IUserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { loading: true, error: null, user: null }
    case UserActionTypes.FETCH_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload }
    case UserActionTypes.FETCH_USER_ERROR:
      return { loading: false, error: action.payload, user: null }
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        user: action.payload,
      }
    case UserActionTypes.UPDATE_USER_ERROR:
      return { loading: false, error: action.payload, user: state.user }
    case UserActionTypes.LOGOUT_USER:
      return { loading: false, error: null, user: null }
    default:
      return state
  }
}
