const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const path = require('path')

const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')
const orderRoute = require('./routes/orderRoute');

const serverRoutes = require('./serverRoutes/routes/router');

const userBankRoute = require('./routes/userBank');

dotenv.config();

mongoose.
    connect(process.env.MONGO_URL)
    .then( ()=>{
        console.log("DB connected !")
    }).catch( (err)=>{
        console.log("Error occurs for: ", err);
    });

app.use(express.json());

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// API
app.use("/api/users", userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.use('/api/userbank', userBankRoute);

app.use("/css", express.static(path.resolve(__dirname, "clientSide/css")))
app.use("/fo", express.static(path.resolve(__dirname, "clientSide/fonts")))
app.use("/img", express.static(path.resolve(__dirname, "clientSide/img")))
app.use("/js", express.static(path.resolve(__dirname, "clientSide/js")))

app.use('/', serverRoutes)

const port = 4001
app.listen(port, ()=>{
    console.log(`Serving is running at: http://localhost:${port}`)
})
