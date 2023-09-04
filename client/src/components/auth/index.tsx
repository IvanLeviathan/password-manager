import React, { FC, useState } from 'react'
import './style.scss'
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ChangeLanguageComponent from '../changeLanguage'
import SwitchThemeComponent from '../switchTheme'
import apiRequest from '../../utils/apiRequest'

import { useActions } from '../../hooks/useActions'

interface IAuth {}
const AuthComponent: FC<IAuth> = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [signEmail, setSignEmail] = useState('')

  const { t } = useTranslation()
  const { fetchUser, addAlert } = useActions()
  const [mode, setMode] = useState<'auth' | 'register'>('auth')

  const tryAuth = async (e: React.MouseEvent | null = null) => {
    if (e) {
      if (login && password) e.preventDefault()
      else return
    }

    const res = await apiRequest('/auth/login', 'POST', { login, password })
    addAlert({
      text: t(`apiAnswers.${res.data.message}`),
      status: res.status,
    })
    if (res.status === 200) {
      localStorage.setItem('jwt', res.data.data)
      fetchUser()
    }
  }

  const tryRegister = async (e: React.MouseEvent) => {
    if (login && signEmail && password) e.preventDefault()
    else return
    const res = await apiRequest('/users/', 'POST', {
      login: login,
      password: password,
      email: signEmail,
    })
    if (res.data?.message) {
      addAlert({
        text: t(`apiAnswers.${res.data.message}`),
        status: res.status,
      })
      if (res.status === 201) {
        tryAuth()
      }
    } else {
      addAlert({ text: t(`apiAnswers.${res.statusText}`), type: 'danger' })
    }
  }

  const authPage = () => {
    return (
      <>
        <Card.Body>
          <Card.Title className="text-center">{t('authPage.auth')}</Card.Title>
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

            <Button variant="primary" onClick={(e) => tryAuth(e)} type="submit">
              {t('authPage.submit')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-end">
          {t('authPage.noAccount')}{' '}
          <Button size="sm" onClick={() => setMode('register')}>
            {t('authPage.register')}
          </Button>
        </Card.Footer>
      </>
    )
  }

  const registerPage = () => {
    return (
      <>
        <Card.Body>
          <Card.Title className="text-center">
            {t('authPage.registerTitle')}
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>{t('authPage.email')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('authPage.emailPlaceholder')}
                onChange={(e) => setSignEmail(e.target.value)}
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
              onClick={(e) => tryRegister(e)}
              type="submit"
            >
              {t('authPage.registerBtn')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-end">
          {t('authPage.gotAccount')}{' '}
          <Button size="sm" onClick={() => setMode('auth')}>
            {t('authPage.signin')}
          </Button>
        </Card.Footer>
      </>
    )
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
                {mode === 'auth' ? authPage() : registerPage()}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AuthComponent
