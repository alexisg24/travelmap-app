import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './routes/index.routes'
import { swaggerDocs } from './routes/docs/docs.routes'
import { errorJson } from './helpers/errorJson'
dotenv.config()

const server = express()
const PORT = process.env.PORT ?? 3001
server.disable('x-powered-by')
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static('public'))
server.use('/api/v1', router)
swaggerDocs(server, PORT)
server.use('*', (_, res) => res.status(404).json(errorJson('Route not found')))

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

export default server
