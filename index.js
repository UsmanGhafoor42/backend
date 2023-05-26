const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

//Connecting to MongoDb (returns a promise use .then or asyn/await)
const uri = "mongodb://127.0.0.1:27017/usman";
mongoose.set("strictQuery", true);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });


//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);




app.get('/',(req,res)=>{
    res.send("Welcome to HomePage");
})


// app.get('/users',(req,res)=>{
//     res.send("Welcome to Users Page");
// })



app.listen(port,() =>{
    console.log(`server is running on ${port}`)
})