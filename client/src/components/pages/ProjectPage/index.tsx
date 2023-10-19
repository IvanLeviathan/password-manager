import React, { FC, useEffect, useState } from 'react'
import './style.scss'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import apiRequest from '../../../utils/apiRequest'
import { useTranslation } from 'react-i18next'
import { ItemInterface, ReactSortable } from 'react-sortablejs'

export interface IProject {
  _id: string
  id: string | number
  owner: string
  name: string
  description: string
  sort: number
}

export interface ISort {
  _id: string
  sort: number
}

interface IPassword {
  id: string | number
  _id: string
  project: string
  owner: string
  name: string
  login: string
  password: string
  comment: string
  sort: number
}

interface IProjectPage {}

const ProjectPage: FC<IProjectPage> = () => {
  const { projectId } = useParams()
  const [curProject, setCurProject] = useState<IProject | null | undefined>(
    undefined,
  )

  const [passwords, setPasswords] = useState<IPassword[] | null | undefined>(
    undefined,
  )

  const [newProjectName, setNewProjectName] = useState<string>('')
  const [newProjectDescription, setNewProjectDescription] = useState<string>('')

  const [deleteProjectModalShow, setDeleteProjectModalShow] =
    useState<boolean>(false)

  const [newPasswordModalShow, setNewPasswordModalShow] =
    useState<boolean>(false)

  const [deletePasswordModalShow, setDeletePasswordModalShow] =
    useState<boolean>(false)
  const [passwordToDelete, setPasswordToDelete] = useState<string>('')

  const [newPasswordName, setNewPasswordName] = useState<string>('')
  const [newPasswordLogin, setNewPasswordLogin] = useState<string>('')
  const [newPasswordPassword, setNewPasswordPassword] = useState<string>('')
  const [newPasswordComment, setNewPasswordComment] = useState<string>('')

  const { addAlert } = useActions()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const loadProject = async (projectId: string) => {
    const res = await apiRequest(
      `/projects/${projectId}`,
      'GET',
      {},
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (res.status === 200) {
      setCurProject(res.data.data)
    } else {
      setCurProject(null)
      setPasswords(null)
    }
  }

  const sortPasswords = (passwords: IPassword[]) => {
    const sortedPasswords = [...passwords]
    sortedPasswords.sort((a, b) => {
      if (a.sort > b.sort) return 1
      if (a.sort < b.sort) return -1
      return 0
    })

    return sortedPasswords
  }

  const loadPasswords = async (projectId: string) => {
    const res = await apiRequest(
      `/password/${projectId}`,
      'GET',
      {},
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (res.status === 200) {
      const passwords = res.data.data as IPassword[]
      setPasswords(sortPasswords(passwords))
    } else {
      setPasswords(null)
    }
  }

  useEffect(() => {
    if (projectId) loadProject(projectId)
  }, [])

  useEffect(() => {
    if (!curProject) return
    loadPasswords(curProject._id)
    setNewProjectName(curProject.name)
    setNewProjectDescription(curProject.description)
  }, [curProject])

  const updateProject = async (e: React.MouseEvent) => {
    if (newProjectName) e.preventDefault()
    else return

    const res = await apiRequest(
      `/projects/`,
      'PUT',
      {
        _id: curProject?._id,
        name: newProjectName,
        description: newProjectDescription,
      },
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (res.status === 200) {
      setCurProject(res.data.data)
      addAlert({
        text: t(`apiAnswers.${res.data.message}`),
        type: 'success',
      })
    } else {
      addAlert({
        text: t(`apiAnswers.${res.statusText}`),
        type: 'danger',
      })
    }
  }

  const deleteProject = async (projectId: string) => {
    const res = await apiRequest(
      `/projects/`,
      'DELETE',
      {
        _id: projectId,
      },
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (res.status === 200) {
      addAlert({
        text: t(`apiAnswers.${res.data.message}`),
        type: 'success',
      })
      navigate('/')
    } else {
      addAlert({
        text: t(`apiAnswers.${res.statusText}`),
        type: 'danger',
      })
    }
  }

  const createNewPassword = async (e: React.MouseEvent) => {
    if (newPasswordLogin && newPasswordName && newPasswordPassword)
      e.preventDefault()
    else return

    const res = await apiRequest(
      `/password/`,
      'POST',
      {
        project: curProject?._id,
        name: newPasswordName,
        login: newPasswordLogin,
        password: newPasswordPassword,
        comment: newPasswordComment,
      },
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (res.status === 201) {
      addAlert({
        text: t(`apiAnswers.${res.data.message}`),
        type: 'success',
      })
    } else {
      addAlert({
        text: t(`apiAnswers.${res.statusText}`),
        type: 'danger',
      })
    }

    setNewPasswordLogin('')
    setNewPasswordComment('')
    setNewPasswordName('')
    setNewPasswordPassword('')
    setNewPasswordModalShow(false)
    if (curProject?._id) loadPasswords(curProject?._id)
  }

  const updatePassword = async (
    passwordId: string,
    e: React.MouseEvent | null = null,
  ) => {
    const updateObj = {
      _id: '',
      name: '',
      login: '',
      password: '',
      comment: '',
    }

    const passwordCardNode = document.getElementById(
      `password-card-${passwordId}`,
    )
    if (!passwordCardNode) return

    updateObj._id = passwordId

    const nameNode = passwordCardNode.querySelector(
      '[data-type="passwordName"]',
    ) as HTMLInputElement
    if (nameNode) updateObj.name = nameNode.value || ''

    const loginNode = passwordCardNode.querySelector(
      '[data-type="passwordLogin"]',
    ) as HTMLInputElement
    if (loginNode) updateObj.login = loginNode.value || ''

    const passwordNode = passwordCardNode.querySelector(
      '[data-type="passwordPassword"]',
    ) as HTMLInputElement
    if (passwordNode) updateObj.password = passwordNode.value || ''

    const commentNode = passwordCardNode.querySelector(
      '[data-type="passwordComment"]',
    ) as HTMLInputElement
    if (passwordNode) updateObj.comment = commentNode.value || ''

    if (
      !updateObj._id.length ||
      !updateObj.name.length ||
      !updateObj.login.length ||
      !updateObj.password.length
    ) {
      return addAlert({
        text: t('projectPage.passwordCard.notEnoughFieldsToUpdate'),
        type: 'danger',
      })
    }
    if (e) e.preventDefault()

    const res = await apiRequest(`/password/`, 'PUT', updateObj, {
      'x-auth-token': localStorage.getItem('jwt'),
    })
    if (res.status === 200) {
      addAlert({
        text: t(`apiAnswers.${res.data.message}`),
        type: 'success',
      })
    } else {
      addAlert({
        text: t(`apiAnswers.${res.statusText}`),
        type: 'danger',
      })
    }
  }

  const deletePassword = async () => {
    console.log(passwordToDelete)
    if (!passwordToDelete) {
      setDeletePasswordModalShow(false)
      return addAlert({
        text: t(`projectPage.deletePasswordModal.noPasswordIdProvided`),
        type: 'danger',
      })
    }
    const res = await apiRequest(
      `/password/`,
      'DELETE',
      { _id: passwordToDelete },
      {
        'x-auth-token': localStorage.getItem('jwt'),
      },
    )
    if (res.status === 200) {
      setDeletePasswordModalShow(false)
      addAlert({
        text: t(`apiAnswers.${res.data.message}`),
        type: 'success',
      })
      if (curProject?._id) loadPasswords(curProject._id)
    } else {
      setDeletePasswordModalShow(false)
      addAlert({
        text: t(`apiAnswers.${res.statusText}`),
        type: 'danger',
      })
    }
  }

  const updateSorts = async (sortArr: ISort[]) => {
    const res = await apiRequest(
      '/password/sort',
      'POST',
      { newItemsSort: sortArr },
      {
        'x-auth-token': localStorage.getItem('jwt'),
      },
    )
    if (res.status !== 200) {
      addAlert({ text: t(`apiAnswers.${res.statusText}`), type: 'danger' })
    }
  }

  const onSortChange = async (newState: ItemInterface[]) => {
    const sortUpdateObj: ISort[] = []
    const newSortItems: IPassword[] = newState.map((newObj, index) => {
      const newPassword: IPassword = {
        id: newObj._id,
        _id: newObj._id,
        comment: newObj.comment,
        login: newObj.login,
        name: newObj.name,
        owner: newObj.owner,
        password: newObj.password,
        project: newObj.project,
        sort: (index + 1) * 100,
      }
      sortUpdateObj.push({ _id: newPassword._id, sort: newPassword.sort })
      return newPassword
    })
    setPasswords(newSortItems)
    return updateSorts(sortUpdateObj)
  }

  const projectRow = () => {
    if (typeof curProject === 'undefined')
      return (
        <Card>
          <Card.Body>
            <Spinner animation="border" />
          </Card.Body>
        </Card>
      )
    if (!curProject)
      return (
        <Card>
          <Card.Body>
            {t('projectPage.notFound')}
            <br />
            <Link to={'/'}>{t('projectPage.goBack')}</Link>
          </Card.Body>
        </Card>
      )
    return (
      <Card>
        <Form>
          <Card.Body>
            <Form.Group className="mb-3" controlId="projectName">
              <Form.Label>{t('projectPage.projectName')}*</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('projectPage.projectNamePlaceholder')}
                onChange={(e) => setNewProjectName(e.target.value)}
                required
                value={newProjectName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="projectDescription">
              <Form.Label>{t('projectPage.projectDescription')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('projectPage.projectDescriptionPlaceholder')}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                value={newProjectDescription}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button type="submit" onClick={(e) => updateProject(e)}>
              {t('projectPage.updateProject')}
            </Button>
            <Button
              variant="danger"
              className="ms-3"
              onClick={() => setDeleteProjectModalShow(true)}
            >
              {t('projectPage.deleteProject')}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    )
  }

  const passwordsRow = () => {
    if (typeof passwords === 'undefined')
      return (
        <Col>
          <Card>
            <Card.Body>
              <Spinner animation="border" />
            </Card.Body>
          </Card>
        </Col>
      )
    if (!curProject || !passwords) return
    if (!passwords.length)
      return (
        <Col>
          <Card>
            <Card.Body>{t('projectPage.passwordsNotFound')}</Card.Body>
          </Card>
        </Col>
      )
    return (
      <ReactSortable
        className={'row'}
        list={passwords}
        setList={onSortChange}
        animation={250}
      >
        {passwords.map((password) => {
          return (
            <Col lg={3} className="mb-4" key={password._id}>
              <Card id={`password-card-${password._id}`}>
                <Form>
                  <Card.Header>
                    <Form.Control
                      type="text"
                      data-type="passwordName"
                      defaultValue={password.name}
                      required
                    />
                  </Card.Header>
                  <Card.Body>
                    <p>
                      <Form.Label>
                        {t('projectPage.passwordCard.login')}
                      </Form.Label>

                      <Form.Control
                        type="text"
                        defaultValue={password.login}
                        data-type="passwordLogin"
                        required
                      />
                    </p>
                    <p>
                      <Form.Label>
                        {t('projectPage.passwordCard.password')}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={password.password}
                        data-type="passwordPassword"
                        required
                      />
                    </p>
                    <p>
                      <Form.Label>
                        {t('projectPage.passwordCard.comment')}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        defaultValue={password.comment}
                        data-type="passwordComment"
                      />
                    </p>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button
                      size="sm"
                      onClick={(e) => updatePassword(password._id, e)}
                      type="submit"
                    >
                      {t('projectPage.passwordCard.update')}
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      size="sm"
                      onClick={() => {
                        setPasswordToDelete(password._id)
                        setDeletePasswordModalShow(true)
                      }}
                    >
                      {t('projectPage.passwordCard.delete')}
                    </Button>
                  </Card.Footer>
                </Form>
              </Card>
            </Col>
          )
        })}
      </ReactSortable>
    )
  }

  return (
    <>
      <Container>
        <Row className="mb-5">
          <Col>{projectRow()}</Col>
        </Row>
        {curProject?._id && (
          <Row className="mb-3">
            <Col className="text-end">
              <Button
                variant="success"
                onClick={() => setNewPasswordModalShow(true)}
              >
                {t('projectPage.newPassword')}
              </Button>
            </Col>
          </Row>
        )}
        <Row className="passwords-list">{passwordsRow()}</Row>
      </Container>

      {/* MODALS */}
      <Modal
        show={deleteProjectModalShow}
        onHide={() => setDeleteProjectModalShow(false)}
      >
        <Modal.Header closeButton>
          {t('projectPage.deleteProjectModal.deleteProject', {
            projectName: curProject?.name,
          })}
        </Modal.Header>
        <Modal.Body>
          {t('projectPage.deleteProjectModal.passwordsWillAlsoDeleted')}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              deleteProject(curProject?._id ? curProject?._id : '')
            }
          >
            {t('projectPage.deleteProjectModal.delete')}
          </Button>
          <Button
            variant="primary"
            onClick={() => setDeleteProjectModalShow(false)}
          >
            {t('projectPage.deleteProjectModal.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={newPasswordModalShow}
        onHide={() => setNewPasswordModalShow(false)}
      >
        <Modal.Header closeButton>
          {t('projectPage.newPasswordModal.newPassword', {
            projectName: curProject?.name,
          })}
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="passwordName">
              <Form.Label>
                {t('projectPage.newPasswordModal.passwordName')}*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t(
                  'projectPage.newPasswordModal.passwordNamePlaceholder',
                )}
                onChange={(e) => setNewPasswordName(e.target.value)}
                required
                value={newPasswordName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordLogin">
              <Form.Label>
                {t('projectPage.newPasswordModal.passwordLogin')}*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t(
                  'projectPage.newPasswordModal.passwordLoginPlaceholder',
                )}
                onChange={(e) => setNewPasswordLogin(e.target.value)}
                required
                value={newPasswordLogin}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordPassword">
              <Form.Label>
                {t('projectPage.newPasswordModal.passwordPassword')}*
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t(
                  'projectPage.newPasswordModal.passwordPasswordPlaceholder',
                )}
                onChange={(e) => setNewPasswordPassword(e.target.value)}
                required
                value={newPasswordPassword}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordComment">
              <Form.Label>
                {t('projectPage.newPasswordModal.passwordComment')}
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder={t(
                  'projectPage.newPasswordModal.passwordCommentPlaceholder',
                )}
                onChange={(e) => setNewPasswordComment(e.target.value)}
                value={newPasswordComment}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={(e) => createNewPassword(e)}
              type="submit"
            >
              {t('projectPage.newPasswordModal.submit')}
            </Button>
            <Button
              variant="danger"
              onClick={() => setNewPasswordModalShow(false)}
            >
              {t('projectPage.newPasswordModal.cancel')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal
        show={deletePasswordModalShow}
        onHide={() => setDeletePasswordModalShow(false)}
      >
        <Modal.Header closeButton>
          {t('projectPage.deletePasswordModal.confirmDelete')}
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deletePassword()}>
            {t('projectPage.deletePasswordModal.submit')}
          </Button>
          <Button
            variant="primary"
            onClick={() => setDeletePasswordModalShow(false)}
          >
            {t('projectPage.deletePasswordModal.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectPage
