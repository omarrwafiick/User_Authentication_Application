const express = require('express'); 
require('./../node_modules/dotenv').config();
const cors = require('cors');
const DbConnection = require('./db/connectDB'); 
const cookieParser = require('../node_modules/cookie-parser');
const authRoute = require('./routes/auth.route');
const app = express(); 

app.use(cors({origin:"http://localhost:5173", credentials: true})); 
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.listen(process.env.PORT_NUM , ()=>{ 
    DbConnection(process.env.MONGO_URL);
    console.log(`App is running on port ${process.env.PORT_NUM}`)
});

