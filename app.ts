import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import morgan from 'morgan'
import driversRoutes from './routes/driversRoutes'
import carsRoutes from './routes/carsRoutes'
import utilsRoutes from './routes/utilsRoutes'

dotenv.config()
connectDB()


const app = express()

app.use(morgan('combined'))
app.use(express.json())

app.use('/api/cars', carsRoutes)
app.use('/api/drivers', driversRoutes)
app.use('/api/utils', utilsRoutes)

export default app;
