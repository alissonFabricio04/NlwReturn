import express from 'express'
import cors from 'cors'

import { routes } from './routes/routes'

const app = express()

app.use(cors()) // see
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
  console.log(`Server is running!`)
})