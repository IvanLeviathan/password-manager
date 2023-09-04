import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth'
import projectsRoutes from './routes/project'
import passwordRoutes from './routes/password'
import path from 'path'
const app = express()
const port = process.env.BACKEND_PORT || 5000

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(cors())

//routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/password', passwordRoutes)

// front
app.use(express.static(path.join(__dirname, '../../..', '/client/dist/')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', '/client/dist/index.html'))
})

export default async function startServer() {
  app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
  })
}
