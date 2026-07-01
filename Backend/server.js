const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes') 

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config() 

const app = express() 
  
app.use(cors())
app.use(express.json()) 
 
app.use('/todos', todoRoutes)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})

// console.log(process.env.MONGO_URI)
// console.log(process.env.JWT_SECRET)

mongoose.connect(process.env.MONGO_URI)  
.then(() => {
    console.log('MongoDB Connected')

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch(err => {
    console.error('MongoDB Error:', err)
})