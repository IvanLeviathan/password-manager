import Router from 'express'
import { authMiddleware } from '../middleware/auth.middleware'

import {
  createPassword,
  deletePassword,
  getPasswords,
  updatePassword,
} from '../controllers/password'
const passwordRoutes = Router()

// passwordRoutes.get('/', authMiddleware, (req, res) => {
//   getProject(req, res)
// })

passwordRoutes.get('/:projectId', authMiddleware, (req, res) => {
  getPasswords(req, res)
})

passwordRoutes.post('/', authMiddleware, (req, res) => {
  createPassword(req, res)
})

passwordRoutes.put('/', authMiddleware, (req, res) => {
  updatePassword(req, res)
})

passwordRoutes.delete('/', authMiddleware, (req, res) => {
  deletePassword(req, res)
})

export default passwordRoutes
