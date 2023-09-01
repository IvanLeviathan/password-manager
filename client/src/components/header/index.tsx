import React, { FC } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

interface IHeader {}
const HeaderComponent: FC<IHeader> = () => {
  return (
    <div>
      <Link to={'/'}>Главная</Link>
      <Link to={'/projects'}>Проекты</Link>
      <Link to={'/projects/321'}>Проект</Link>
    </div>
  )
}

export default HeaderComponent
