import expeditious from 'express-expeditious'

const cacheOptions: expeditious.ExpeditiousOptions = {
  namespace: 'expresscache',
  defaultTtl: '5 minutes'
}

export const cacheHandler = expeditious(cacheOptions)
