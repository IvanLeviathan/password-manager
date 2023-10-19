import Router from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  sortProjects,
  updateProject,
} from '../controllers/project'
const projectsRoutes = Router()

projectsRoutes.get('/:projectId', authMiddleware, (req, res) => {
  getProject(req, res)
})

projectsRoutes.get('/', authMiddleware, (req, res) => {
  getProjects(req, res)
})

projectsRoutes.post('/', authMiddleware, (req, res) => {
  createProject(req, res)
})

projectsRoutes.put('/', authMiddleware, (req, res) => {
  updateProject(req, res)
})

projectsRoutes.delete('/', authMiddleware, (req, res) => {
  deleteProject(req, res)
})

//sort update
projectsRoutes.post('/sort', authMiddleware, (req, res) => {
  sortProjects(req, res)
})

export default projectsRoutes
