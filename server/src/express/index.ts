import express, { NextFunction, Request, Response } from 'express'
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

const directIpCheck = (req: Request, res: Response, next: NextFunction) => {
  const proxyHost = req.headers['x-forwarded-host']
  const host = proxyHost ? proxyHost : req.headers.host
  if (typeof host !== 'string') return next()

  const regex =
    /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9][0-9]|[1-5](\d){4}|[1-9](\d){0,3})/gim
  const match = host.match(regex)

  if (match?.length) {
    return res.status(403).send('Sorry, direct IP access not allowed.')
  }

  next()
}

//routes
app.use('/api/auth', directIpCheck, authRoutes)
app.use('/api/users', directIpCheck, userRoutes)
app.use('/api/projects', directIpCheck, projectsRoutes)
app.use('/api/password', directIpCheck, passwordRoutes)

// front
app.use(
  express.static(path.join(__dirname, '../../..', '/client/dist/'), {
    index: false,
  }),
)
app.get('*', directIpCheck, (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', '/client/dist/index.html'))
})

export default async function startServer() {
  app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
  })
}
