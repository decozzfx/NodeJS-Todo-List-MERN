const cors = require('cors')
const express = require('express')
const dbConn = require('./config/db.js')
const router = require('./routes/route.js')
require('dotenv').config()

// set db connection
dbConn

// set Middleware
const app = express()
app.use(express.json())
app.use(cors())

app.use('/task', router)

port = process.env.PORT
app.listen(port , () => console.info(`Server listen on http://localhost:${port}...`))