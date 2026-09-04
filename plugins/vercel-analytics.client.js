import { inject } from '@vercel/analytics'

// Initialize Vercel Web Analytics
inject({
  mode: 'auto',
  debug: process.env.NODE_ENV === 'development'
})
