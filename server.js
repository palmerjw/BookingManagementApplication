const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./routes/users")
const managerRouter = require("./routes/managers")
const emailRouter = require("./routes/emails")
const hotelRouter = require("./routes/hotels")
const roomRouter = require("./routes/rooms")
require('dotenv').config();


//you might notice the process.env
//this is a reference to a file in the folder which contains key values
//for instance, the url to the mongoDB is the ATLAS_URI

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

//get uri for database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

//connect to database
connection.once("open", () => {
    console.log("mongoDB database conneciton established successfullly")
});

app.use("/user", userRouter)
app.use("/manager", managerRouter)
app.use("/email", emailRouter)
app.use("/hotel", hotelRouter)
app.use("/room", roomRouter)

//start the server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
