import Router from 'express'
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user'
const userRoutes = Router()

userRoutes.get('/:id', (req, res) => {
  getUserById(req, res)
})

userRoutes.get('/', (req, res) => {
  getUsers(req, res)
})

userRoutes.post('/', (req, res) => {
  createUser(req, res)
})

userRoutes.put('/', (req, res) => {
  updateUser(req, res)
})

userRoutes.delete('/', (req, res) => {
  deleteUser(req, res)
})

export default userRoutes
