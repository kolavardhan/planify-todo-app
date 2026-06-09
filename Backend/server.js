const todoRoutes = require('./routes/todoRoutes')

const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/todos', todoRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected')

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})
.catch(err => {
    console.error('MongoDB Error:', err)
})


