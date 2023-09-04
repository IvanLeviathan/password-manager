import { FC, useContext } from 'react'
import MainContext from '../../context/main'
import './style.scss'

interface IFooter {}
const FooterComponent: FC<IFooter> = () => {
  const context = useContext(MainContext)
  return (
    <footer className={`mt-5 text-end bg-${context?.theme}`}>
      Copyright © 2023 - {new Date().getFullYear()}{' '}
      <a target="_blank" href="https://github.com/IvanLeviathan">
        IvanLeviathan
      </a>
    </footer>
  )
}

export default FooterComponent
