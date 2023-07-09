// const mongoose = require('mongoose');
import * as mongoose from "mongoose";
const connection = {}

async function dbConnect (){
  
    if(connection.isConnected) {
        
        return;
    }

const db = await mongoose.connect(
        process.env.MONGO_URI,
        // 'mongodb+srv://ruzpro:h9TgtxA2sdou5Ejn@cluster0.kozruih.mongodb.net/ruzpro?retryWrites=true&w=majority',

        // 'mongodb+srv://salah:wD5wxV3sek4BPTKJ@cluster0.dzvfwsq.mongodb.net/?retryWrites=true&w=majority',

        {
        useNewUrlParser :true, 
        useUnifiedTopology: true,


    });

    connection.isConnected = db.connections[0].readyState;
    
    
}
export default dbConnect