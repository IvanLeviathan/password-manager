import Router from 'express'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user'
import { authMiddleware } from '../middleware/auth.middleware'
const userRoutes = Router()

userRoutes.get('/', authMiddleware, (req, res) => {
  getUser(req, res)
})

// userRoutes.get('/', authMiddleware, (req, res) => {
//   getUsers(req, res)
// })

userRoutes.post('/', (req, res) => {
  createUser(req, res)
})

userRoutes.put('/', authMiddleware, (req, res) => {
  updateUser(req, res)
})

userRoutes.delete('/', authMiddleware, (req, res) => {
  deleteUser(req, res)
})

export default userRoutes
