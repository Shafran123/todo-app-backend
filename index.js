const express = require('express')
const app = express();
var cors = require('cors')
const todoRoute = require('./routes/todoRoute')

const port = process.env.PORT || 3001


app.use(express.json());
app.use(cors())

const fs = require('firebase-admin');
const serviceAccount = require('./friebase/todo-app-aefda-firebase-adminsdk-k85ak-ec37f8d6f5.json')

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
})

app.use('/api/v1', todoRoute)

app.listen(port, () => console.log('Server is up and running'))