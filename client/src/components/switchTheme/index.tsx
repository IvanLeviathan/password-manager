import { FC, useContext, useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import './style.scss'
import sunIcon from '../../assets/images/icons/sun.png'
import moonIcon from '../../assets/images/icons/moon.png'
import MainContext, { TTheme } from '../../context/main'

interface ISwitchTheme {}

const themeKey = 'theme'
const defaultTheme: TTheme = 'dark'

const SwitchThemeComponent: FC<ISwitchTheme> = () => {
  const [curTheme, setCurTheme] = useState<TTheme>(defaultTheme)
  const context = useContext(MainContext)

  useEffect(() => {
    const localStorageTheme: TTheme =
      (localStorage.getItem(themeKey) as TTheme) || curTheme
    changeTheme(localStorageTheme)
  }, [])
  const changeTheme = (theme: TTheme) => {
    localStorage.setItem(themeKey, theme)
    setCurTheme(theme)

    context?.changeTheme(theme)
  }

  const dropDownIcon = () => {
    const icon = curTheme === 'dark' ? moonIcon : sunIcon
    return <img className="theme-icon me-2" src={icon} alt="Theme" />
  }

  return (
    <div className="themeSwitcher">
      <NavDropdown
        menuVariant={context?.theme}
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
