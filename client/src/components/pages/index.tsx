import { FC } from 'react'
import './style.scss'
import HeaderComponent from '../header'
import Router from '../../Router'

interface IMainPages {}
const MainPages: FC<IMainPages> = () => {
  return (
    <>
      <HeaderComponent />
      <Router />
    </>
  )
}

export default MainPages
