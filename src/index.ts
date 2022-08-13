import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

import routersV1 from './routes'

// Base configuration
// =============================================================================
const app = express()
const PORT = process.env.PORT || 3001

// App configuration
// =============================================================================
app.use(helmet())
app.use(cors())
app.use(express.json())

// API ROUTES
// =============================================================================
app.use(routersV1.path, routersV1.router)

// INIT SERVER
// =============================================================================
app.listen(PORT, () => {
	console.log(`[App]: Listening on port ${PORT}`)
})
