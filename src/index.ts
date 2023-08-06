import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/index.routes'
dotenv.config()

const server = express()
const PORT = process.env.PORT ?? 3001

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static('public'))

server.use('/api/v1', router)
server.use('*', (_, res) => res.status(404).json({ message: 'Not found' }))

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
