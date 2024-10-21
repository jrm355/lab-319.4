// imports
import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import gradesRoutes from './routes/gradeRoutes.mjs'
import newroutes from './319.4/newroutes.mjs'

// SetUps
const app = express()
dotenv.config()
let PORT = process.env.PORT || 3001

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
// routes
app.use('/grades', gradesRoutes)
app.use('/')
// listener
app.listen(PORT, ()=>{
    console.log(`Server Running on Port: ${PORT}`)
})