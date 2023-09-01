import { FC, useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import './style.scss'
import sunIcon from '../../assets/images/icons/sun.png'
import moonIcon from '../../assets/images/icons/moon.png'

interface ISwitchTheme {}

const themeKey = 'theme'
const defaultTheme = 'dark'

const SwitchThemeComponent: FC<ISwitchTheme> = () => {
  const [curTheme, setCurTheme] = useState(defaultTheme)

  useEffect(() => {
    const localStorageTheme = localStorage.getItem(themeKey) || curTheme
    changeTheme(localStorageTheme)
  }, [])
  const changeTheme = (theme: string) => {
    localStorage.setItem(themeKey, theme)
    setCurTheme(theme)
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  const dropDownIcon = () => {
    const icon = curTheme === 'dark' ? moonIcon : sunIcon
    return <img className="theme-icon me-2" src={icon} alt="Theme" />
  }

  return (
    <div className="themeSwitcher">
      <NavDropdown
        menuVariant="dark"
        id="dropdown-language"
        title={dropDownIcon()}
      >
        <NavDropdown.Item onClick={() => changeTheme('dark')}>
          <img className="theme-icon" src={moonIcon} alt="dark" />
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => changeTheme('light')}>
          <img className="theme-icon" src={sunIcon} alt="light" />
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  )
}

export default SwitchThemeComponent
