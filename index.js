const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require("./src/routes/router")
const app = express();
dotenv.config();

app.use(express.json());

const initiaization = async()=>{
    const connection = mongoose.connect(process.env.MONOOSE_URL);
    connection.then(async()=>{
        console.log("........mongoose connected");
        let PORT = process.env.PORT || 8080
        app.listen(PORT,()=>{
            console.log(`server running on ${PORT}`);
        });
        app.use(routes)
    }).catch(async(err)=>{
        console.log(err);
    })
}
initiaization();
