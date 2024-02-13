const mongoose = require('mongoose');


const connectToDB = async ()=> {
    const connectionString = process.env.DB_URL;

    const test = "mongodb://192.168.43.107:27017/Hedera-IOT"

    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
}

module.exports=connectToDB ;