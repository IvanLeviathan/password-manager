import * as UserActionCreators from './user'
import * as AlertsActionCreators from './alerts'

export default {
  ...UserActionCreators,
  ...AlertsActionCreators,
}
