const express = require('express')
const app = express();
var cors = require('cors')
const todoRoute = require('./routes/todoRoute')

const port = process.env.PORT || 3001


app.use(express.json());
app.use(cors())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
})

app.use('/api/v1', todoRoute)

app.listen(port, () => console.log('Server is up and running'))