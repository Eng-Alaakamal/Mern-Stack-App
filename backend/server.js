require('dotenv').config()
const express= require('express')
const workoutRouters =require('./routes/workouts')
const mongoose = require('mongoose')
const userRouters =require('./routes/user')

//express app
const app=express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
 
app.use('/api/user', userRouters)
app.use('/api', workoutRouters)
 
//connect to database
mongoose.connect(process.env.MONGO_URL)
   .then(() =>{
       //listen for requests
        app.listen(process.env.PORT,()=>{
            console.log('connecting to database & listening for port',process.env.PORT)
        })
   })
   .catch((error) =>{
     console.log(error)
   })
 

