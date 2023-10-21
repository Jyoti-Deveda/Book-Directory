const express = require('express');
const { Router } = require('./Routes/Books');
const dbConnect = require('./Config/database');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use('/api/v1', Router);

app.get('/', () => {
    console.log("Server is running");
})

dbConnect();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`)
})