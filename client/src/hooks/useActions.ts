import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import ActionCreators from '../store/action-creators/'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(ActionCreators, dispatch)
}
