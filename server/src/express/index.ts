import express from 'express'
import userRoutes from './routes/user'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.BACKEND_PORT || 5000

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use('/api/users', userRoutes)

export default async function startServer() {
  app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
  })
}
