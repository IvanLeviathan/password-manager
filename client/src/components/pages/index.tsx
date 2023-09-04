import { FC } from 'react'
import './style.scss'
import HeaderComponent from '../header'
import Router from '../../Router'
import FooterComponent from '../footer'

interface IMainPages {}
const MainPages: FC<IMainPages> = () => {
  return (
    <div className="main-wrapper">
      <HeaderComponent />
      <div className="content">
        <Router />
      </div>
      <FooterComponent />
    </div>
  )
}

export default MainPages
