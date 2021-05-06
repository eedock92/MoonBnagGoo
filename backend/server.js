import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'


dotenv.config({ path : './config/config.env'})
//connect db
connectDB()

const app = express()

//Development Setup
if(process.env.NODE_ENV === 'development'){
    // require morgan if in development mode
    // setting morgan to dev
    app.use(morgan('dev'))
}

//router
app.get('/', (req, res) => {
    res.send('API is running...')
})


app.use('/api/products', productRoutes)

// custom middleware here
app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)