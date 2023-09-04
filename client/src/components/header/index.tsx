import { FC, useContext } from 'react'
import './style.scss'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, Spinner, Button } from 'react-bootstrap'
import ChangeLanguageComponent from '../changeLanguage'
import SwitchThemeComponent from '../switchTheme'
import MainContext from '../../context/main'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { useActions } from '../../hooks/useActions'

interface IHeader {}
const HeaderComponent: FC<IHeader> = () => {
  const context = useContext(MainContext)

  const { user } = useTypedSelector((state) => state.user)
  const { t } = useTranslation()
  const { logoutUser } = useActions()
  return (
    <header className="mb-5">
      <Navbar variant={context?.theme} bg={context?.theme} expand="lg">
        <Container fluid>
          <Link to={'/'} className="navbar-brand">
            {t('header.brandName')}
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={'/'} className="nav-link">
                {t('header.menu.mainPage')}
              </NavLink>
              <NavLink to={'/profile'} className="nav-link">
                {user?.login || <Spinner animation="border" size="sm" />}
              </NavLink>
            </Nav>
            <Nav>
              <SwitchThemeComponent drop="start" />
              <ChangeLanguageComponent drop="start" />
              <div className="d-flex align-items-center">
                <Button
                  variant="danger"
                  onClick={logoutUser}
                  className="mt-4 mt-lg-0"
                >
                  {t('header.logout')}
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default HeaderComponent
