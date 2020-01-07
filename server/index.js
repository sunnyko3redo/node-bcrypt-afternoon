require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./controllers/authController')

const app = express()

app.use(express.json())

// ! session needs to be above your end points.
app.use(
    session({
        resave: true,
        saveUninitalized: false,
        secret: SESSION_SECRET

    })
)

// ! end points always need to go at the bottom just above the listener

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`How many licks does it take to get to the center of a tootsie pop? ${SERVER_PORT}`))
    
})

