import Router from 'express'
import { getUserById, getUsers } from '../controllers/user'
const userRoutes = Router()

userRoutes.get('/:id', (req, res) => {
  // getImage(req, res)
  getUserById(req, res)
})

userRoutes.get('/', (req, res) => {
  getUsers(req, res)
})

userRoutes.post('/', (req, res) => {
  // getImage(req, res)
  res.send('Added user here')
})

export default userRoutes
