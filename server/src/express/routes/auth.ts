import Router from 'express'
import { loginController } from '../controllers/auth'

const authRoutes = Router()

authRoutes.post('/login', async (req, res) => {
  loginController(req, res)
})

export default authRoutes
