const mongoose = require("mongoose")

const ConnectDB = async (connectionString)=>{
    try { 
       const connection = await mongoose.connect(connectionString);
       console.log(`Connected To Mongoose : ${connection.connection.host}`);
    } catch (error) {
        console.log(`Connection Error To Mongoose : ${error}`);
        process.exit(1);//1 is failure - 0 is success
    }
};

module.exports = ConnectDB;