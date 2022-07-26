require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandleMiddleware')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const path = require("path");
const PORT = process.env.PORT || 5002;


const app = express();

if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('combined')) //loging
}

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api', router)


//last Middleware!!!
app.use(errorHandler)

const emitStart = () => {
    app.emit( "app_started" )
}

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
            setTimeout(emitStart, 100)
        } );
    } catch (e) {
        console.log(e);
    }
}



start()

module.exports = app; // for testing