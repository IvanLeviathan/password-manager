import express from 'express'
import userRoutes from './routes/user'

const app = express()
const port = process.env.BACKEND_PORT || 5000

app.get('/', (request, response) => {
  response.send('Hello world!')
})

app.use('/api/users', userRoutes)

export default async function startServer() {
  app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
  })
}