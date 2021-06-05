import express from 'express'
import path from 'path'
import session from 'express-session'
import MongoDBSession from 'connect-mongodb-session'
import cors from 'cors'
import cookieParser from 'cookie-parser' 
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config({ path : './config/config.env'})
//connect db
connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())


//session 사용


// app.use(
//     session({
//         secret : "key that will sign cookie",
//         resave : false,
//         saveUninitialized : false,
       
//     })
// )

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
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))




if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend',  'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

// custom middleware here
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)