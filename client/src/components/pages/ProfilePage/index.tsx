import React, { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'

interface IProfilePage {}
const ProfilePage: FC<IProfilePage> = () => {
  const { t } = useTranslation()

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user } = useTypedSelector((state) => state.user)

  const { updateUser, addAlert } = useActions()

  useEffect(() => {
    if (!user) return
    setLogin(user.login)
    setEmail(user.email)
  }, [])

  const updateUserProfile = async (e: React.MouseEvent) => {
    if (email) e.preventDefault()
    else return
    interface returnType {
      data?: { message?: string }
    }
    const res = (await updateUser(login, email, password)) as returnType
    if (res.data?.message) {
      addAlert({
        text: t(`apiAnswers.${res.data?.message}`),
        type: 'success',
      })
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {t('profilePage.title', { user: user?.login })}
              </Card.Title>
              <Form className="mw-50 mx-auto">
                <Form.Group className="mb-3" controlId="login">
                  <Form.Label>{t('profilePage.login')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('profilePage.loginPlaceholder')}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    value={login}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>{t('profilePage.email')}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t('profilePage.emailPlaceholder')}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('profilePage.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('profilePage.passwordPlaceholder')}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={(e) => updateUserProfile(e)}
                  type="submit"
                >
                  {t('profilePage.submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
