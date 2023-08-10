import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelMap API Documentation',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*/*.ts', './prisma/schema.prisma']
}
// Docs in json format
const swaggerSpec = swaggerJSDoc(options)

// setup our docs
export const swaggerDocs = (app: Router, port: string | number): void => {
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  console.log(`Version 1 Docs are running on port ${port}`)
}
