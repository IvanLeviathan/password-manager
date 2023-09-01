import React, { FC, useState, useContext } from 'react'
import './style.scss'
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ChangeLanguageComponent from '../changeLanguage'
import SwitchThemeComponent from '../switchTheme'
import apiRequest from '../../utils/apiRequest'

import MainContext from '../../context/main'

interface IAuth {}
const AuthComponent: FC<IAuth> = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { t } = useTranslation()
  const context = useContext(MainContext)

  const tryAuth = async (e: React.MouseEvent) => {
    if (login && password) e.preventDefault()
    else return

    const res = await apiRequest('/auth/login', 'POST', { login, password })
    context?.addAlert({
      text: t(`apiAnswers.${res.message}`),
      status: res.status,
    })
    if (res.status === 200) {
      localStorage.setItem('jwt', res.data)
      context?.getUser()
    }
  }

  return (
    <>
      <div className="change-language">
        <ChangeLanguageComponent />
      </div>
      <div className="switch-theme">
        <SwitchThemeComponent />
      </div>
      <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col>
              <Card className="mw-75 m-auto">
                <Card.Body>
                  <Card.Title className="text-center">
                    {t('authPage.auth')}
                  </Card.Title>
                  <Form>
                    <Form.Group className="mb-3" controlId="login">
                      <Form.Label>{t('authPage.login')}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t('authPage.loginPlaceholder')}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>{t('authPage.password')}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t('authPage.passwordPlaceholder')}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      onClick={(e) => tryAuth(e)}
                      type="submit"
                    >
                      {t('authPage.submit')}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AuthComponent
