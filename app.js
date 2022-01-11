const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require("./config/keys");
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')
const teamRoutes = require('./routes/team')
const tTaskRoutes = require('./routes/teamTask')
const authRoutes = require('./routes/auth')
const fs = require("fs")
// const https = require("https");
// const key = fs.readFileSync('./key.pem')
// const cert = fs.readFileSync('./cert.pem');

mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/task', taskRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/teamTask', tTaskRoutes)

// const server = https.createServer({ key: key, cert: cert }, app);
// server.listen(3020, () => { console.log('Server is working on 3020') });
//
app.listen(3020, () => console.log(`Server is working on ${3020}`));
