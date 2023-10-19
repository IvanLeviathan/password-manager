import React, { FC, useState, useEffect } from 'react'
import { ItemInterface, ReactSortable } from 'react-sortablejs'
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
import apiRequest from '../../../utils/apiRequest'
import { useActions } from '../../../hooks/useActions'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IProject, ISort } from '../ProjectPage'

interface IHomePage {}

const HomePage: FC<IHomePage> = () => {
  const [projects, setProjects] = useState<IProject[] | null>(null)
  const [filterdProjects, setFilteredProjects] = useState<IProject[] | null>(
    null,
  )
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>('')
  const [projectDescription, setProjectDescription] = useState<string>('')
  const [filterString, setFilterString] = useState<string>('')

  const { addAlert } = useActions()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const loadProjects = async () => {
    const res = await apiRequest(
      '/projects',
      'GET',
      {},
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (res.status === 200) {
      setProjects(res.data.data)
    } else {
      addAlert({ text: t(`apiAnswers.${res.statusText}`), type: 'danger' })
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    if (projects)
      projects.sort((a, b) => {
        if (a.sort > b.sort) return 1
        if (a.sort < b.sort) return -1
        return 0
      })
    if (!filterString.length) return setFilteredProjects(projects)
    if (!projects) return setFilteredProjects(projects)

    const fProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(filterString),
    )

    setFilteredProjects(fProjects)
  }, [filterString, projects])

  const selectProject = (id: string) => {
    navigate(`/projects/${id}`)
  }

  const createNewProject = async (e: React.MouseEvent) => {
    if (projectName) e.preventDefault()
    else return
    const res = await apiRequest(
      '/projects',
      'POST',
      { name: projectName, description: projectDescription },
      { 'x-auth-token': localStorage.getItem('jwt') },
    )

    if (res.status === 201) {
      addAlert({
        text: t(`apiAnswers.${res.data.message}`),
        type: 'success',
      })
    } else {
      addAlert({ text: t(`apiAnswers.${res.statusText}`), type: 'danger' })
    }
    loadProjects()
    setProjectName('')
    setProjectDescription('')
    setModalShow(false)
  }

  const updateSorts = async (sortArr: ISort[]) => {
    const res = await apiRequest(
      '/projects/sort',
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

  function onSortChange(newState: ItemInterface[]) {
    const sortUpdateObj: ISort[] = []

    const newSortItems: IProject[] = newState.map((newObj, index) => {
      const newProject: IProject = {
        id: newObj.id,
        _id: newObj._id,
        description: newObj.description,
        name: newObj.name,
        owner: newObj.owner,
        sort: (index + 1) * 100,
      }
      sortUpdateObj.push({ _id: newProject._id, sort: newProject.sort })
      return newProject
    })
    setFilteredProjects(newSortItems)
    return updateSorts(sortUpdateObj)
  }
  return (
    <>
      <Container>
        <Row>
          <Col
            xs={{ span: 12, order: 2 }}
            lg={{ span: 6, order: 1 }}
            className="mb-5"
          >
            <Form.Control
              type="text"
              placeholder={t('homePage.search')}
              onChange={(e) => setFilterString(e.target.value)}
            />
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 2 }}
            className="text-end mb-5"
          >
            <Button variant="success" onClick={() => setModalShow(true)}>
              {t('homePage.newProject')}
            </Button>
          </Col>
        </Row>

        {!filterdProjects ? (
          <Spinner animation="border" />
        ) : (
          <Row className="projects">
            <ReactSortable
              className={'row'}
              list={filterdProjects}
              setList={onSortChange}
              animation={250}
            >
              {!filterdProjects.length ? (
                <Col>
                  <Card>
                    <Card.Body>{t('homePage.noProjects')}</Card.Body>
                  </Card>
                </Col>
              ) : (
                filterdProjects.map((project) => (
                  <Col lg={3} className="mb-4" key={project._id}>
                    <Card onClick={() => selectProject(project._id)}>
                      <Card.Body>
                        <Card.Title>{project.name}</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </ReactSortable>
          </Row>
        )}
      </Container>

      {/* modal for new project */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          {t('homePage.modal.newProject')}
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="projectName">
              <Form.Label>{t('homePage.modal.projectName')}*</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('homePage.modal.projectNamePlaceholder')}
                onChange={(e) => setProjectName(e.target.value)}
                required
                value={projectName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="projectDescription">
              <Form.Label>{t('homePage.modal.projectDescription')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('homePage.modal.projectDescriptionPlaceholder')}
                onChange={(e) => setProjectDescription(e.target.value)}
                value={projectDescription}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => createNewProject(e)}
            >
              {t('homePage.modal.save')}
            </Button>
            <Button variant="danger" onClick={() => setModalShow(false)}>
              {t('homePage.modal.cancel')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default HomePage
