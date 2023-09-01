import { FC, useContext } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import ChangeLanguageComponent from '../changeLanguage'
import SwitchThemeComponent from '../switchTheme'
import MainContext from '../../context/main'

interface IHeader {}
const HeaderComponent: FC<IHeader> = () => {
  const context = useContext(MainContext)
  return (
    <Navbar variant={context?.theme} bg={context?.theme} expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Password Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={'/'} className="nav-link">
              Главная
            </Link>
            <Link to={'/profile'} className="nav-link">
              Профиль
            </Link>
          </Nav>
          <Nav>
            <SwitchThemeComponent drop="start" />
            <ChangeLanguageComponent drop="start" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderComponent
