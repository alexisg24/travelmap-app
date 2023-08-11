import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI, { SwaggerOptions } from 'swagger-ui-express'
import * as SchemaDocs from './docsSchemas/schemas.docs'
import * as ResponseDocs from './docsSchemas/responses.docs'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelMap API Documentation',
      version: '1.0.0'
    }
  },
  apis: ['./src/docs/*.ts', './src/routes/*/*.ts']
}
// Docs in json format
const swaggerSpec: SwaggerOptions = swaggerJSDoc(options)

// Mutate the swagger spec to include the schemas
swaggerSpec.components = {
  schemas: { ...SchemaDocs, ...ResponseDocs }
}

// setup our docs
export const swaggerDocs = (app: Router, port: string | number): void => {
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  console.log(swaggerSpec.paths['/api/v1/users/login'].post.requestBody.content)
  console.log(`Version 1 Docs are running on port ${port}`)
}
