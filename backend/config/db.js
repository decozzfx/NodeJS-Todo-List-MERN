const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB

const dbConn = mongoose.connect(url , {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then((res) => console.info('DB is connected'))
.catch((err) => console.info('Could not connect to DB'))

module.exports = dbConn