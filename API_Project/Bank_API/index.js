const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path')

const userRoute = require('./API_routes/userRoute')
// const transactionDetailsCheck = require('./API_routes/transactionDetailsCheck')

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB has been connected !")
}).catch(err=>{
    console.log("Error is: ", err)
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', userRoute)
// app.use('/api/transaction', transactionDetailsCheck)

const port = 4006;
app.listen(port, (req, res)=>{
    console.log(`Server is running at http://localhost:${port}`);
})
